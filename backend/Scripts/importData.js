import Products from '../models/productsModels.ts';
import User from '../models/userModels.ts';
import Order from '../models/orderModel.ts';
import fs from 'fs';
import path from 'path';
import { connectDBAtlas } from './db-atlas.js';
// ! Scripts pour transférer les données en ligne sur Atlas
// ! Pour utiliser ce script : node ./Scripts/importData.js  avec argument --import ou --delete

var __dirname = path.resolve(path.dirname(''));

const product = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/DataProducts.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/DataUsers.json`, 'utf-8')
);

const importData = async () => {
  try {
    await connectDBAtlas();
    await Products.create(product);
    await User.create(users);
    console.log('Data Fully imported ! Good Job !');
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
    console.log('Data succefullly deleted ! Good Job');
    process.exit;
  } catch (error) {
    console.log(`ERROR : ${error}`);
    process.exit(1);
  }
};
const updateData = async () => {
  try {
    console.log('Connect ->');
    await connectDBAtlas();
    console.log('Update ->');
    await Order.updateMany({ isDelvered }, { $set: { isDelvered: null } });
  } catch (error) {
    console.log(`ERROR : ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  DeleteData();
} else if (process.argv[2] === '--update') {
  updateData();
}
