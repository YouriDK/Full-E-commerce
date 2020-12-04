import express from "express";
import User from "../models/userModels";

const router = express.Router();

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
