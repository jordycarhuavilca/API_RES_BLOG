const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");
const {userState,userType} = require('../../utils/states')


const user = sequelize.define("user",
  {
    userId: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameUser : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherLastName : {
      type: DataTypes.STRING,
    },
    motherLastName : {
      type: DataTypes.STRING,
    },
    image :{
      type:DataTypes.STRING,
      defaultValue : "defaul.png"
    },
    typeUser : {
      type: DataTypes.STRING,
      defaultValue :userType[0], 
      validate:{
        isIn:[userType] 
       }
    },
    state:{
      type: DataTypes.STRING,
      defaultValue:userState[0],
      validate:{
       isIn:[userState] 
      }
    }
  },
  {
    timestamps: false,
  }
)


module.exports = user;