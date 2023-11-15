const user = require("./models/user");
const courses = require("./models/course");
const purchase = require("./models/purchase");
const purchaseDetail = require("./models/purchaseDetail");
const courseDetails = require("./models/courseDetails");
const comments = require("./models/comments");
const userCourse = require("./models/userCourse");
const category = require("./models/category");

//this is when user is intructor
user.hasMany(courses, { foreignKey: "userId" });
courses.belongsTo(user, { foreignKey: "userId" });

user.hasMany(purchase, { foreignKey: "userId" });
purchase.belongsTo(user, { foreignKey: "userId" });

courses.hasMany(purchaseDetail, { foreignKey: "courseId" });
purchaseDetail.hasMany(courses, { foreignKey: "courseId" });

purchase.hasMany(purchaseDetail, { foreignKey: "numpurchase" });
purchaseDetail.belongsTo(purchase, { foreignKey: "numpurchase" });

category.hasMany(courses,{foreignKey : "categoryId"})
courses.hasMany(category,{foreignKey : "categoryId"})

courses.hasOne(courseDetails, { foreignKey: "courseId" });
courseDetails.belongsTo(courses, { foreignKey: "courseId" });

user.hasMany(comments, { foreignKey: "userId" });
comments.belongsTo(user, { foreignKey: "userId" });

courses.hasMany(comments, { foreignKey: "courseId" });
comments.belongsTo(courses, { foreignKey: "courseId" });

user.hasMany(userCourse, { foreignKey: 'userId' });
userCourse.belongsTo(user, { foreignKey: 'userId' });

courses.hasMany(userCourse, { foreignKey: 'courseId' });
userCourse.belongsTo(courses, { foreignKey: 'courseId' });



module.exports = {
  user,
  category,
  courses,
  courseDetails,
  comments,
  purchase,
  userCourse,
  purchaseDetail
};
