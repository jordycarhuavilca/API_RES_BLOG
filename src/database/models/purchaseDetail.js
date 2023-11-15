const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");

const purchaseDetail = sequelize.define(
    "purchaseDetail",
    {
      purchaseDetail_Id: {
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
      pricePaid: {
        type: DataTypes.DECIMAL(18, 2),
      },
    },
    { timestamps: false }
);

module.exports = purchaseDetail