import express from "express";
import User from "../models/userModels";
import { getToken } from "../util";
import expressAsyncHandler from "express-async-handler";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log("signinUser", signinUser);
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password. " });
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.email,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();

  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
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
      isAdmin: true,
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

export default router;
