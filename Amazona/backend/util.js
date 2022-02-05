import jwt from 'jsonwebtoken';
import config from './Scripts/config.js';
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';

// TODO Refaire selon la nouvelle version
const getToken = (user) => {
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

// * To check is we'r'e logged in
const isAuth = async (req, res, next) => {
  const auth = req.headers.authorization;
  let tokenValidate = {};
  // * 2 Check : one for local one for Google and if one of them is good we keep going
  if (!auth) {
    return res.status(401).send({ msg: 'Token is not supplied ! ' });
  } else {
    const token = auth.slice(7, auth.length); // * Bearer XXXXX =>  on se débarasse de Bearer
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          // TODO put a real Error without return it
          tokenValidate = { error: err };
        }
        req.user = decode;
        tokenValidate.user = decode;
      }
    );
    const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    tokenValidate.user = ticket.getPayload();

    req.user = {
      ...tokenValidate.user,
      _id: mongoose.ObjectId(tokenValidate.user.sub),
    };

    if (tokenValidate.user) {
      next();
      return;
    } else {
      console.log('error ->', tokenValidate.error);
      return res.status(401).send({ msg: 'Invalid Token ! 🤷‍♂️' });
    }
  }
};

// *  Verifie que la personne est admin avant de donner la suite
const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    return next();
  }
  return res.status(401).send({ msg: 'Admin checked failed.' });
};

export { getToken, isAdmin, isAuth };
