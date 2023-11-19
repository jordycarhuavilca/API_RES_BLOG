const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");

const carrito = sequelize.define(
  "carrito",
  {
    carritoCod: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  { timestamps: false }
);

module.exports = carrito;
