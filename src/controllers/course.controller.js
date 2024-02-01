const model = require("../database/models/course.js");
const constant = require("../utils/constant.js");
const { courseRepos } = require("../repos/course.repos.js");
const { course_service } = require("../services/course.service.js");
const validate  = require('../helpers/validate.js')
const courseRepository = new courseRepos(model);
const courseService = new course_service(courseRepository);

const addCourse = async (req, res) => {
  try {
    const course = req.body
    if (typeof course !== 'object'
    || !course) 
    res.status(constant.reqValidationError.statusCode)
    .json({message : constant.reqValidationError.message})
    
    const data = await courseService.addCourse(course)


    return res.status(constant.reqCreated.statusCode)
    .json({message : constant.reqCreated.message ,data : data})
  
  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message})

  }
};

const listCourses = async (req,res)=>{
  try {
    const data = await courseService.listCourses()
    if (data.length == 0) return res.status(constant.recordNotFound.statusCode)
    .json({message : constant.recordNotFound.message})
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})
  } catch (error) {
    
    return res.status(error.statusCode)
    .json({message : error.message})

  }
  
  
    

}

const getCourse = async (req, res) => {
  try {
    const totalStudents = await courseService.getTotalStudents();
    const data = await courseService.getCourse(req.params.courseId);
    data.totalStudents = totalStudents
    if (data.length == 0) return res.status(constant.recordNotFound.statusCode)
    .json({message : constant.recordNotFound.message })

    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {
    console.log(error.message)
    return res.status(error.statusCode)
    .json({message : error.message})
  }
};

const updateCourse = async (req, res) => {
  try {

    const courseId = req.params.courseId;
    const course = req.body
    if (typeof course !== 'object'
    || !course || !courseId) 
    res.status(constant.reqValidationError.statusCode)
    .json({message : constant.reqValidationError.message})

    const data = await courseService.updateCourse(course, courseId);
    
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message})

  }
};

const updateCourseImage = async (req, res) => {
  try {
    const courseId = req.params.courseId || "" 

    let nameImg = {}
    if (req.multer) {
      nameImg = req.multer.nameImg
    }

    if (!courseId || validate.isEmpty(nameImg)){
      return res.status(constant.reqValidationError.statusCode)
      .json({message : constant.reqValidationError.message })
    }

    const data = await courseService.updateCourseImage(nameImg,courseId);

     return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {
    console.log(error.message)
    return res.status(error.statusCode)
    .json({message : error.message })

  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId
    if (!courseId)  return res.status(constant.reqValidationError.statusCode)
    .json({ message : constant.reqValidationError.message })

    const data = await courseService.deleteCourse(courseId);

    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {

    console.log(error.message)
    return res.status(error.statusCode)
    .json({message : error.message })

  }
};

const buscarCurso = async (req, res) => {
  try {
    const data = await courseService.buscarCurso(req.query.q);

    if (data.length == 0) return res.status(constant.recordNotFound.statusCode)
    .json({message : constant.recordNotFound.message})

    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})
  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message })

  }
};

const addCourseVideo = async (req,res)=>{

}

const listCategoryAndSubs = async (req, res) => {
  try {
    const data = await courseService.listCategoryAndSubs();

    if (data.length == 0) return res.status(constant.recordNotFound.statusCode)
    .json({message : constant.recordNotFound.message})

    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})
  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message })

  }
};
const getCourseByCateAndSubs = async (req, res) => {
  try {
    const category = req.params.category
    const subCategory = req.params.subCategory
    const data = await courseService.getCourseByCateAndSubs(category,subCategory);

    if (data.length == 0) return res.status(constant.recordNotFound.statusCode)
    .json({message : constant.recordNotFound.message })

    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message})

  }
};
const getCoursesByTopic = async (req,res) =>{
  try {
    const data = await courseService.getCoursesByTopic(req.params.topicName);
    
    if (data.length == 0) return res.status(constant.recordNotFound.statusCode)
    .json({message : constant.recordNotFound.message})
  
    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})
    
  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message})

  }
}
module.exports = {
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  updateCourseImage,
  buscarCurso,
  listCategoryAndSubs,
  getCourseByCateAndSubs,
  getCoursesByTopic,
  listCourses,
  addCourseVideo
};
