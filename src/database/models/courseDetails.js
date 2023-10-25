const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");

const courseDetails = sequelize.define('courseDetails',{
courseDetailsId : {
    type: DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement:true
},
hours : DataTypes.INTEGER,
numExercise : DataTypes.INTEGER,
articulos : DataTypes.INTEGER,
recursosDescargable : DataTypes.INTEGER,
certificacion : DataTypes.BOOLEAN
},{timestamps:false,
})
module.exports = courseDetails