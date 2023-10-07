const sequelize = require("../database/db.js");
const { DataTypes } = require("sequelize");
const User = sequelize.define(
  "user",
  {
    iduser: DataTypes.INTEGER,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;