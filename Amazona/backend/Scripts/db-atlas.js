import config from './Scripts/config.js';
import doten from 'dotenv';
import mongoose from 'mongoose';

doten.config();
const mongo_atlas = config.MONGODB_URI;

// * Fonction pour  se connecter sur le mongo en ligne
export const connectDBAtlas = async () => {
  try {
    await mongoose
      .connect(mongo_atlas, {
        useNewUrlParser: true,
        // * Pour enlever les warnings
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .catch((error) => console.log('FAIL', error));
  } catch (error) {
    console.log('Connection failed ! 😅');
    process.exit(1);
  }
};

//module.exports = connectDBAtlas;
