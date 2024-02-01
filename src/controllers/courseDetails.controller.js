const model = require("../database/models/courseDetails.js");
const constant = require("../utils/constant.js");
const { courseDetailsRepos } = require("../repos/courseDetails.repos.js");
const {
  courseDetails_service,
} = require("../services/courseDetails.service.js");

const courseDetailsRepository = new courseDetailsRepos(model);
const courseDetailsService = new courseDetails_service(courseDetailsRepository);

const addCourseDetails = async (req, res) => {
  try {
    const courseDetails = req.body

    if (typeof courseDetails !== 'object'
    || !courseDetails) 
    return res.status(constant.reqValidationError.statusCode)
    .json({message : constant.reqValidationError.message})

    const data = await courseDetailsService.addCourseDetails(courseDetails);

     return res.status(constant.reqCreated.statusCode)
    .json({message : constant.reqCreated.message ,data : data})
  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message })
  }
}

const updateCourseDetails = async (req, res) => {
  try {
    const courseDetails =req.body;
    const courseId =  req.params.courseId

    if (typeof courseDetails !== 'object'
    || !courseId) 
    res.status(constant.reqValidationError.statusCode)
    .json({message : constant.reqValidationError.message})

    const data = await courseDetailsService.updateCourseDetails(
      courseDetails,
      courseId
    );

    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})
  
  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message })
  }
};
module.exports = {
  addCourseDetails,
  updateCourseDetails,
};
