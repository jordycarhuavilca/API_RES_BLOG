const userModel = require('../database/models/user')
const userCourseModel = require('../database/models/userCourse.js')
const constant = require("../utils/constant.js");
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
    const user = req.body
    const data = await userService.addUser(user);

    return res.status(constant.reqCreated.statusCode)
    .json({message : constant.reqCreated.message ,data : data})

  } catch (error) {
     return res.status(error.statusCode)
    .json({message : error.message })
  }
};
const getUser = async(req,res) =>{
  try {
    const data = await userService.getUser(req.params.userId);
    
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {
    return res.status(error.statusCode)
    .json({message : error.message })
  }
}
const getIntructorCourses = async (req, res) => {
  try {
    const data = await userService.getIntructorCourses(req.params.userId);
    
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {
    return res.status(error.statusCode)
    .json({message : error.message})
  }
};
const myCourses = async (req, res) => {
  try {
    const data = await userService.myCourses(req.params.userId);
    
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {
    return res.status(error.statusCode)
    .json({message : error.message})
  }
};
const updateUser = async (req, res) => {
  try {
    const data = await userService.updateUser(req.body, req.params.userId);
    
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {
    return res.status(error.statusCode)
    .json({message : error.message})
  }
};

const updateUserImage = async (req, res) => {
  try {
    const img = {};
    img.image = req.nameImg;
    const data = await userService.updateUserImage(img, req.params.userId);
    
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {
    return res.status(error.statusCode)
    .json({message : error.message})
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await userService.deleteUser(req.params.userId);
    
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {
    return res.status(error.statusCode)
    .json({message : error.message})
  }
};

const getUserCourse  =async (req,res) =>{
  try {
    const data = await userCourseService.getUserCourse();

    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {
    return res.status(error.statusCode)
    .json({message : error.message});
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
