// const mongoose = require("mongoose");
// const { mongodvUrl } = require("../config.js");
// const connection = async () => {
//   try {
//     const connection = await mongoose.connect(
//         mongodvUrl
//     );
//     console.log("Connected successfully");
//   } catch (err) {
//     console.log("data base !!! " + err);
//   }
// };
const Sequelize = require("sequelize");
const {sequelizeOptions} = require('../config.js')
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  sequelizeOptions
);

module.exports = sequelize;
