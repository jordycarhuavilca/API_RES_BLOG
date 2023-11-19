const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");

const favoritesCourse = sequelize.define(
  "favoritesCourse",
  {
    favoritosId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  { timestamps: false }
);

module.exports = favoritesCourse;