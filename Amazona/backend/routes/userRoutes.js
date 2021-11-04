import express from 'express';
import User from '../models/userModels.js';
import { getToken, isAdmin, isAuth } from '../util.js';
import expressAsyncHandler from 'express-async-handler';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';

const router = express.Router();
const users = [];

const upsert = (array, item) => {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
};

router.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      // ! On compare le Hash du mot de passe et non le mot de passe lui même pour la sécurité
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user.id,
          name: user.name,
          email: user.email,
          admin: user.admin,
          token: getToken(user),
        });
      }
    } else {
      res.status(401).send({ msg: 'Invalid Email or Password 🤦‍♀️ ! ' });
    }
  })
);
router.post(
  '/signin/google',
  expressAsyncHandler(async (req, res) => {
    const { token } = req.body;
    const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    // * on prend le sub car il semble être identique on va l'utiliser comme token
    const { name, email, picture, given_name, family_name, sub } =
      ticket.getPayload();
    upsert(users, { name, email, picture, given_name, family_name, sub });
    res.status(201);
    res.json({ name, email, picture, given_name, family_name, sub });
  })
);
// * Récupère tous les user
router.get(
  '/userlist',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find();
    if (users) {
      res.send(users);
    } else {
      res.status(404).send({ message: 'User List Not Found' });
    }
  })
);
router.post('/register', async (req, res) => {
  const user = new User({
    admin: false,
    name: req.body.email,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const newUser = await user.save();

  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      admin: newUser.admin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: 'Invalid User Data !' });
  }
});

// * Récupère les infos du profil
router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

router.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updateUser = await user.save();
      res.send({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        admin: updateUser.admin,
        token: getToken(updateUser),
      });
    }
  })
);

export default router;
