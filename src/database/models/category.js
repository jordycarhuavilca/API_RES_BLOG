const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");


const category = sequelize.define('category',{
categoryId :{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
},
description : DataTypes.TEXT
},{timestamps:false,
})

module.exports = category