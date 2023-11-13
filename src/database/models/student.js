const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");
const {studentState} = require('../../utils/states')

const student = sequelize.define("student",
  {
    studentId: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    numberStudent:{
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image :{
      type:DataTypes.STRING,
      defaultValue : "defaul.png"
    },
    state:{
      type: DataTypes.STRING,
      defaultValue:studentState[0],
      validate:{
       isIn:[studentState] 
      }
    }
  },
  {
    timestamps: false,
  }
)


module.exports = student;