const model = require("../database/models/student.js");
const { serverError } = require("../utils/constant.js");
const { response } = require("../utils/CustomResponse.js");
const { studentRepos } = require("../repos/students.repos.js");
const { student_service } = require("../services/students.service.js");

const studentRepository = new studentRepos(model);
const studentService = new student_service(studentRepository);

const addStudent = async (req, res) => {
  try {
    const data = await studentService.addStudent(req.body);
    return response(data, res);
  } catch (error) {
    return response(serverError);
  }
};

const getStudent = async (req, res) => {
  try {
    const data = await studentService.getStudent(req.params.studentId);
    return response(data, res);
  } catch (error) {
    return response(serverError);
  }
};

const getStudentCourses = async (req, res) => {
  try {
    const data = await studentService.getStudentCourses(req.params.studentId);
    return response(data, res);
  } catch (error) {
    return response(serverError);
  }
};

const updateStudent = async (req, res) => {
  try {
    const data = await studentService.updateStudent(
      req.body,
      req.params.courseId
    );
    return response(data, res);
  } catch (error) {
    return response(serverError);
  }
};

const updateStudentImage = async (req, res) => {
  try {
    const img = {};
    img.image = req.nameImg;
    const data = await studentService.updateStudentImage(
      img,
      req.params.courseId
    );
    return response(data, res);
  } catch (error) {
    return response(serverError);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const data = await studentService.deleteStudent(req.params.studentId);
    return response(data, res);
  } catch (error) {
    return response(serverError);
  }
};
module.exports = {
  addStudent,
  getStudent,
  getStudentCourses,
  updateStudent,
  updateStudentImage,
  deleteStudent,
};
