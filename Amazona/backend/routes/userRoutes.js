import express from "express";
import User from "../models/userModels.js";
import { getToken, isAuth } from "../util.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// TODO Créer un admin et 3 clients
const router = express.Router();

router.post(
  "/signin",
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
      res.status(401).send({ msg: "Invalid Email or Password 🤦‍♀️ ! " });
    }
  })
);

router.post("/register", async (req, res) => {
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
    res.status(401).send({ msg: "Invalid User Data !" });
  }
});

/* // TODO Creer une page juste pour créer des admins
router.get("/createadmin", async (req, res) => {
  try {
    console.log("PASSWORD", req.body.password);
    const user = new User({
      admin: true,
      name: "Admin",
      email: "Admin@admin.com",
      password: "admin",
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
  } catch (error) {
    res.send({ msg: error.message });
  }
});*/

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
