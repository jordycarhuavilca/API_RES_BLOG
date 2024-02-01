const Sequelize = require("sequelize");
const sequelizeOptions = require('../config/DataBaseconfig')
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_ROOT_PASSWORD,
  sequelizeOptions
);


module.exports = sequelize;
