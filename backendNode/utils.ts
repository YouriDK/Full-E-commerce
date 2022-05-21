import { verify, sign } from 'jsonwebtoken';
import config from './Scripts/config';
import { OAuth2Client } from 'google-auth-library';
import userModel from './models/userModels';
import { AdminError } from './errors/error-generator';
import { TokenInvalidError } from './errors/error-generator';
// TODO Refaire selon la nouvelle version
const getToken = (user: any) => {
  return sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '2d',
    }
  );
};

// * To check if we're logged in
const isAuth = async (req: any, res: any, next: Function) => {
  console.log('🥱 Who are you ? 🥱');
  const auth = req.headers.authorization;
  let tokenValidate: any = {};
  // * 2 Check : one for local one for Google and if one of them is good we keep going
  if (!auth) {
    return res.status(401).send({ msg: 'Token is not supplied ! ' });
  } else {
    const token = auth.slice(7, auth.length); // * Bearer XXXXX =>  on se débarasse de Bearer
    verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err: any, decode: any) => {
        if (err) {
          tokenValidate = {
            success: false,
            error: err,
          };
        }
        req.user = decode;
        tokenValidate = {
          success: true,
          user: decode,
        };
      }
    );
    if (!tokenValidate.user) {
      // * Google Auth
      console.log('🤞 Google Auth 🤞');
      try {
        const client = new OAuth2Client({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        });
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });

        const getUser = await userModel
          .findOne({
            email: ticket.getPayload()?.email,
          })
          .then((data: any) => data);

        // * We put the simple data to get a valid _id
        req.user = getUser;
      } catch (error: any) {
        tokenValidate = {
          success: false,
          error: error,
        };
      }
    }

    if (tokenValidate.success) {
      console.log('✔ Next -> User ->');
      next();
      return;
    } else {
      // TODO Faire un retour à login car ça veut dire qu'il manqueme token ( expried)
      console.log('Error ->', tokenValidate.error);
      console.log('Error ->', tokenValidate.error.Error);
      return res.status(401).send(TokenInvalidError());
    }
  }
};

// *  Verifie que la personne est admin avant de donner la suite
const isAdmin = (req: any, res: any, next: Function) => {
  if (req.user && req.user.admin) {
    return next();
  }
  return res.status(401).send(AdminError());
};

export { getToken, isAdmin, isAuth };
