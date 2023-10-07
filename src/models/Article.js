// const { Schema, model } = require("mongoose");
// const ArticuloSchema = Schema({
//   tittle: {
//     type: String,
//     require: true,
//   },
//   description: {
//     type: String,
//     require: true,
//   },
//   date: {
//     type: Date,
//     require: true,
//     default: Date.now,
//   },
//   image: {
//     type: String,
//     default: "default.png",
//   },
// });

// module.exports = model("articles", ArticuloSchema);
const sequelize = require("../database/db.js");
const { DataTypes } = require("sequelize");
const article = sequelize.define(
  "articles",
  {
    numArticle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    tittle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createAt:  DataTypes.DATEONLY,
    image:DataTypes.STRING,
    iduser : {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
  }
);

module.exports = article;
