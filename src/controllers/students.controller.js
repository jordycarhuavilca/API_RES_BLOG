const model = require("../database/models/student.js");
const constant = require("../utils/constant.js");
const { studentRepos } = require("../repos/students.repos.js");
const { student_service } = require("../services/students.service.js");

const studentRepository = new studentRepos(model);
const studentService = new student_service(studentRepository);

const addStudent = async (req, res) => {
  try {
    const student = req.body
    if (typeof student !== 'object'
    || !student) 
    return res.status(constant.reqValidationError.statusCode)
    .json({message : constant.reqValidationError.message})


    const data = await studentService.addStudent(student);

    return res.status(constant.reqCreated.statusCode)
    .json({message : constant.reqCreated.message ,data : data})

  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message})

  }
};

const getStudent = async (req, res) => {
  try {
    const data = await studentService.getStudent(req.params.studentId);
    
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})
    
  } catch (error) {
    
    return res.status(error.statusCode)
    .json({message : error.message})

  }
};

const getStudentCourses = async (req, res) => {
  try {
    const data = await studentService.getStudentCourses(req.params.studentId);
    
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message})

  }
};

const updateStudent = async (req, res) => {
  try {
    const data = await studentService.updateStudent(
      req.body,
      req.params.courseId
    );

    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message})
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

    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message})
  }
};

const deleteStudent = async (req, res) => {
  try {
    const data = await studentService.deleteStudent(req.params.studentId);
   
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message})
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
