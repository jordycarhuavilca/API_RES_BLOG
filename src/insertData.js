const listModels = require("./database/index.models");
const fs = require("fs/promises");
const path = require("path");

const getCurrentPath = (filename, extention) => {
  return path.join(__dirname, `./data/${filename}.${extention}`);
};

const insertData = async (pathWay, model, nameModel) => {
  try {
    let dataString = await fs.readFile(pathWay, "utf-8");
    model.bulkCreate(JSON.parse(dataString));
    console.log(`${nameModel} inserted successfully`);
  } catch (error) {
    console.log(`error inserting data ${error}`);
  }
};

const insert = async () => {
  const listNameData = [
    "user",
    "category",
    "subCategory",
    "topic",
    "subCategoryTopic",
    "course",
    "courseTopic",
    "courseDetails",
    "comments",
    "purchase",
    "purchaseDetail",
    "userCourse"
  ];
  let index = 0;

  const orderModels = {
    user : listModels.user,
    category : listModels.category,
    subCategory : listModels.subCategory,
    topic : listModels.topic,
    subCategory_topic : listModels.subCategory_topic,
    course : listModels.courses,
    courseTopic : listModels.courseTopic,
    courseDetail : listModels.courseDetails,
    commnent : listModels.comments,
    purchase : listModels.purchase,
    purchaseDetail : listModels.purchaseDetail,
    userCourse : listModels.userCourse
  };

  for (let key in orderModels) {
    const pathWay = getCurrentPath(listNameData[index], "json");
    await insertData(pathWay, orderModels[key], listNameData[index]);
    index++;
  }
};
module.exports = insert;
