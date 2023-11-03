const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");
const {userState,userType} = require('../../utils/states')


const user = sequelize.define("user",
  {
    userId: {
      type:DataTypes.STRING,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameUser : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    family_name : {
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
    refreshToken : {
      type:DataTypes.STRING,
      defaultValue: 'no refresh token'
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