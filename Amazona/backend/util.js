import jwt from "jsonwebtoken";
import config from "./Scripts/config.js";

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
      expiresIn: "15d",
    }
  );
};
// * On utilise isAuth seulement quand on veut être sur d'être connecté
const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.slice(7, auth.length); // * Bearer XXXXX =>  on se débarasse de Bearer
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          return res.status(401).send({ msg: "Invalid Token ! 🤷‍♂️" });
        }
        req.user = decode;
        next();
        return;
      }
    );
  } else {
    return res.status(401).send({ msg: "Token is not supplied ! " });
  }
};

// *  Verifie que la personne est admin avant de donner la suite
const isAdmin = (req, res, next) => {
  console.log(req.user && req.user.admin);
  if (req.user && req.user.admin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin Token is not valid." });
};

export { getToken, isAdmin, isAuth };
