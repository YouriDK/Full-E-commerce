import express from "express";
import config from "./config";
import doten from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoutes";
import productRoute from "./routes/productsRoutes";
import orderRoute from "./routes/orderRoutes";

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
app.use("/api/orders", orderRoute);
app.use("/api/product", productRoute); // ! Il fallait mettre cela pour pouvoir voir les détais du produit

app.get("/api/config/paypal", (req, res) => {
  //* Pour récupérer le client ID paypal dans le back end
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

/* 
! express understand only ES5 and we're in ES6  that's why we need babel*/

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
