import express from "express";
import User from "../models/userModels";

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
      isAdmin: signinUser.isAdmin,
      token: getToken(user),
    });
  } else {
    res.status(401)({ msg: "Invalid Email or Password. " });
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
    res.Send({ msg: error.message });
  }
});

export default router;
