const model = require("../database/models/course.js");
const { serverError } = require("../utils/constant.js");
const { response } = require("../utils/CustomResponse.js");
const { courseRepos } = require("../repos/course.repos.js");
const { course_service } = require("../services/course.service.js");

const courseRepository = new courseRepos(model);
const courseService = new course_service(courseRepository);

const addCourse = async (req, res) => {
  try {
    const data = await courseService.addCourse(req.body);
    return response(data, res);
  } catch (error) {
    console.log(error)
    return response(serverError,res);
  }
};
const getAllCourses = async (req, res) => {
  try {
    const data = await courseService.getAllCourses();
    return response(data, res);
  } catch (error) { 
    console.log(error)
    return response(serverError,res);
  }
};

const getCourse = async (req, res) => {
  try {
    console.log('getting totalStudents')
    const totalStudents = await courseService.getTotalStudents();
    console.log('total : ' + totalStudents)
    console.log('getting course')
    const data = await courseService.getCourse(req.params.courseId);
    console.log('course : ' + data)
    data.totalStudents = totalStudents
    return response(data, res);
  } catch (error) {
    console.log(error)
    return response(serverError,res);
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const data = await courseService.updateCourse(req.body, courseId);
    return response(data, res);
  } catch (error) {
    console.log(error)
    return response(serverError);
  }
};

const updateCourseImage = async (req, res) => {
  try {
    const img = {};
    img.image = req.nameImg;
    const data = await courseService.updateCourseImage(
      img,
      req.params.courseId
    );
    return response(data, res);
  } catch (error) {
    console.log(error)
    return response(serverError,res);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const data = await courseService.deleteCourse(req.params.courseId);
    return response(data, res);
  } catch (error) {
    console.log(error)
    return response(serverError,res);
  }
};
module.exports = {
  addCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  updateCourseImage,
};
