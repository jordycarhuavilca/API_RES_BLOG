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
    "course",
    "courseDetails",
    "comments",
    "purchase",
    "userCourse"
  ];
  let index = 0;
  const { comments,category, courseDetails, courses, purchase, user,userCourse } = listModels;

  const orderModels = {
    user : user,
    category : category,
    course : courses,
    courseDetail : courseDetails,
    commnent : comments,
    purchase : purchase,
    userCourse : userCourse
  };

  for (let key in orderModels) {
    const pathWay = getCurrentPath(listNameData[index], "json");
    await insertData(pathWay, orderModels[key], listNameData[index]);
    index++;
  }
};
module.exports = insert;
