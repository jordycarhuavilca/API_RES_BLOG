const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");

const purchase = sequelize.define(
  "purchase",
  {
    numpurchase: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paidDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    }
  },
  { timestamps: false }
);

module.exports = purchase;
