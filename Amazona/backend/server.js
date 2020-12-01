import express from "express";
import data from "./data";
const app = express();

/* ! express understand only ES5 and we're in ES6  that's why we need babel*/

app.get("/api/product/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id === productId);

  if (product) res.send(product);
  else res.status(404).send({ msg: " Product Not Found." });
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
