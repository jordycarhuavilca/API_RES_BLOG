// const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");
const {courseState} = require('../../utils/states')


const course = sequelize.define(
  "course",
      {
        courseId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        tittle: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image:{
          type:DataTypes.STRING,
          defaultValue:"default.png"
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        deletedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW, 
        },
        state : {
          type : DataTypes.STRING,
          defaultValue : courseState[1],
          validate : {
            isIn : [courseState]
          }
        }
      },
      {
        timestamps:false,
      }
    );

    module.exports = course;
