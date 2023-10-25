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
    metodo_pago: {
      type: DataTypes.STRING,
      defaultValue : "credit_card",
      validate: {
        isIn: [["credit_card", "debit_card"]],
      },
    },
    paidDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    pricePaid: {
      type: DataTypes.DECIMAL(18, 2),
    },
  },
  { timestamps: false }
);

module.exports = purchase;
