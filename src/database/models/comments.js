const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");


const comments = sequelize.define('comments',{
commentId :{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
},
description : DataTypes.TEXT,
starts : {
  type: DataTypes.DECIMAL(2,1),
  validate : {
        isWithinRange(value) {
          if (value < 1 || value > 5) {
            throw new Error('Starts must be between 1 and 5 with up to 1 decimal place');
          }
        }
    },
},
CommentDated : {
  type: DataTypes.DATEONLY,
  defaultValue : DataTypes.NOW
},

},{timestamps:false,
})

module.exports = comments