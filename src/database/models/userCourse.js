const sequelize = require("../DB_connect");

const userCourse = sequelize.define(
  "userCourse",
  {},
  {
    timestamps: false,
  }
);

module.exports = userCourse;
