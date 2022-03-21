import jwt from 'jsonwebtoken';
import config from './Scripts/config';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';
import userModel from './models/userModels';

// TODO Refaire selon la nouvelle version
const getToken = (user: any) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '15d',
    }
  );
};

// * To check is we're logged in
const isAuth = async (req: any, res: any, next: Function) => {
  console.log('🥱 Who are you ? 🥱');
  const auth = req.headers.authorization;
  let tokenValidate: any = {};
  // * 2 Check : one for local one for Google and if one of them is good we keep going
  if (!auth) {
    return res.status(401).send({ msg: 'Token is not supplied ! ' });
  } else {
    const token = auth.slice(7, auth.length); // * Bearer XXXXX =>  on se débarasse de Bearer
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err: any, decode: any) => {
        if (err) {
          // TODO put a real Error without return it
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
    if (!tokenValidate.success) {
      // * Google Auth
      try {
        const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENT_ID,
        });
        tokenValidate.user = ticket.getPayload();
        const getUser = await userModel.findOne({
          email: tokenValidate.user.email,
        });
        req.user = {
          ...tokenValidate.user,
          _id: getUser?._id || '',
        };
      } catch (error: any) {
        tokenValidate = {
          success: false,
          error: error,
        };
      }
    }

    if (tokenValidate.success) {
      next();
      return;
    } else {
      console.log('Error ->', tokenValidate.error);
      return res.status(401).send({ msg: 'Invalid Token ! 🤷‍♂️' });
    }
  }
};

// *  Verifie que la personne est admin avant de donner la suite
const isAdmin = (req: any, res: any, next: Function) => {
  if (req.user && req.user.admin) {
    return next();
  }
  return res.status(401).send({ msg: '🙄 Admin checked failed.' });
};

export { getToken, isAdmin, isAuth };
