import express from "express";
import config from "./config";
import doten from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoutes";
import productRoute from "./routes/productsRoutes";

doten.config();

const mongodb_Url = config.MONGODB_URL;

mongoose
  .connect(mongodb_Url, {
    useNewUrlParser: true,
    // * Pour enlever les warnings
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/product", productRoute); // ! Il fallait mettre cela pour pouvoir voir les détais du produit

/* ! express understand only ES5 and we're in ES6  that's why we need babel*/
/*
app.get("/api/product/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id === productId);
  console.log("GETTING");
  console.log("product", product);
  if (product) res.send(product);
  else res.status(404).send({ msg: " Product Not Found." });
});*/
/*
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
*/
app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
