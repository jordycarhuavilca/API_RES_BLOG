const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");

const subCategory_topic = sequelize.define(
  "subCategory_topic",
  {
    subCategory_topicId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  { timestamps: false }
);

module.exports = subCategory_topic;