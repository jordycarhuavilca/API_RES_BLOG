const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");

const subCategory = sequelize.define(
  "subCategory",
  {
    subCategoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: DataTypes.TEXT,
  },
  { timestamps: false }
);

module.exports = subCategory;
