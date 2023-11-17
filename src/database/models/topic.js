const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");
const topic = sequelize.define("topic",{
    topicId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    description : {
        type: DataTypes.STRING
    }
},
{ timestamps: false })

module.exports = topic