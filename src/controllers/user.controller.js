const userModel = require('../database/models/user')
const userCourseModel = require('../database/models/userCourse.js')
const { serverError } = require("../utils/constant.js");
const { response } = require("../utils/CustomResponse.js");
const { userRepos } = require("../repos/user.repos.js");
const { user_service } = require("../services/user.service.js");
const { userCourseRespos } = require("../repos/userCourse.repos.js");
const { userCourse_Service} = require("../services/userCourse.service.js");

const userRepository = new userRepos(userModel);
const userService = new user_service(userRepository);

const userCourseRepository = new userCourseRespos(userCourseModel);
const userCourseService = new userCourse_Service(userCourseRepository);

const addUser = async (req, res) => {
  try {
    const data = await userService.addUser(req.body);
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res); 
  }
};
const getUser = async(req,res) =>{
  try {
    const data = await userService.getUser(req.params.userId);
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res); 
  }
}
const getIntructorCourses = async (req, res) => {
  try {
    const data = await userService.getIntructorCourses(req.params.userId);
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  }
};
const myCourses = async (req, res) => {
  try {
    const data = await userService.myCourses(req.params.userId);
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  }
};
const updateUser = async (req, res) => {
  try {
    const data = await userService.updateUser(req.body, req.params.userId);
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  }
};

const updateUserImage = async (req, res) => {
  try {
    const img = {};
    img.image = req.nameImg;
    const data = await userService.updateUserImage(img, req.params.userId);
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await userService.deleteUser(req.params.userId);
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  }
};

const getUserCourse  =async (req,res) =>{
  try {
    const data = await userCourseService.getUserCourse();
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  } 
}
module.exports = {
  addUser,
  getIntructorCourses,
  myCourses,
  updateUser,
  updateUserImage,
  deleteUser,
  getUser,
  getUserCourse
};
