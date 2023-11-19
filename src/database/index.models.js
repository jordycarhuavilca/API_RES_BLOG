const user = require("./models/user");
const purchase = require("./models/purchase");
const purchaseDetail = require("./models/purchaseDetail");
const courseDetails = require("./models/courseDetails");
const comments = require("./models/comments");
const courses = require("./models/course");
const userCourse = require("./models/userCourse");
const category = require("./models/category");
const subCategory = require("./models/subCategory");
const subCategory_topic = require("./models/subCategory_topic");
const topic = require("./models/topic");
const carrito = require("./models/carrito");
const favoritesCourse = require("./models/favoritesCourse");

//this is when user is intructor
user.hasMany(courses, { foreignKey: "userId" });
courses.belongsTo(user, { foreignKey: "userId" });

user.hasMany(carrito,{foreignKey: "userId"})
carrito.belongsTo(user,{foreignKey: "userId"})

courses.hasMany(carrito,{foreignKey: "courseId"})
carrito.belongsTo(courses,{foreignKey: "courseId"})

user.hasMany(favoritesCourse,{foreignKey: "userId"})
favoritesCourse.belongsTo(user,{foreignKey: "userId"})

courses.hasMany(favoritesCourse,{foreignKey: "courseId"})
favoritesCourse.belongsTo(courses,{foreignKey: "courseId"})

user.hasMany(purchase, { foreignKey: "userId" });
purchase.belongsTo(user, { foreignKey: "userId" });

courses.hasMany(purchaseDetail, { foreignKey: "courseId" });
purchaseDetail.hasMany(courses, { foreignKey: "courseId" });

purchase.hasMany(purchaseDetail, { foreignKey: "numpurchase" });
purchaseDetail.belongsTo(purchase, { foreignKey: "numpurchase" });


category.hasMany(subCategory,{foreignKey : "categoryId"})
subCategory.belongsTo(category,{foreignKey : "categoryId"})

subCategory.hasMany(subCategory_topic,{foreignKey : "subCategoryId"})
subCategory_topic.belongsTo(subCategory,{foreignKey : "subCategoryId"})

topic.hasMany(subCategory_topic,{foreignKey : "topicId"})
subCategory_topic.belongsTo(topic,{foreignKey : "topicId"})


topic.hasMany(courses,{foreignKey : "topicId"})
courses.belongsTo(topic,{foreignKey : "topicId"})


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
  subCategory,
  topic,
  subCategory_topic,
  courses,
  courseDetails,
  comments,
  purchase,
  userCourse,
  purchaseDetail,
  carrito,
  favoritesCourse
};
