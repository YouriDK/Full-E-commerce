import express from "express";
import User from "../models/userModels";
import { getToken, isAuth } from "../util";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      admin: signinUser.admin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password. " });
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    admin: true,
    name: req.body.email,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();

  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.admin,
      admin: newUser.admin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid User Data " });
  }
});

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Youri",
      email: "youri.choucoutou@gmail.com",
      password: "1234",
      admin: true,
    });

    const newUser = await user.save();
    res.send(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// * Récupère les infos du profil
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
/*
 * On utilise isAuth seulement quand on veut être sur d'être connecté
 */
router.put(
  "/profile",
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
