const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");
const courseTopicId = sequelize.define("courseTopic",{
    courseTopicId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    }
},
{ timestamps: false })

module.exports = courseTopicId