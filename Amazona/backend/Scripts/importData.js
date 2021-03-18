import doten from "dotenv";
import Products from "./models/productsModels.js";
import User from "./models/userModels.js";
import fs from "fs";
import path from "path";

// ! Scripts pour transférer les données en ligne sur Atlas
// ! Pour utiliser ce script : node ./backend/Scripts/importData.js  avec argument --import ou --delete
import { connectDBAtlas } from "./db-atlas.js";

var __dirname = path.resolve(path.dirname(""));

const product = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/DataProducts.json`, "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/DataUsers.json`, "utf-8")
);

const importData = async () => {
  try {
    await connectDBAtlas();
    await Products.create(product);
    await User.create(users);
    console.log("Data Fully imported ! Good Job !");
    process.exit;
  } catch (error) {
    console.log(`ERROR : ${error}`);
    process.exit(1);
  }
};

const DeleteData = async () => {
  try {
    await connectDBAtlas();
    await User.deleteMany({});
    console.log("Data succefullly deleted ! Good Job");
    process.exit;
  } catch (error) {
    console.log(`ERROR : ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  DeleteData();
}
