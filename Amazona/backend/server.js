import express from "express";
import data from "./data";
const app = express();

/* ! express understand only ES5 and we're in ES6  that's why we need babel*/

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
