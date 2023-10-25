const model = require("../database/models/courseDetails.js");
const { serverError } = require("../utils/constant.js");
const { response } = require("../utils/CustomResponse.js");
const { courseDetailsRepos } = require("../repos/courseDetails.repos.js");
const {
  courseDetails_service,
} = require("../services/courseDetails.service.js");

const courseDetailsRepository = new courseDetailsRepos(model);
const courseDetailsService = new courseDetails_service(courseDetailsRepository);

const addCourseDetails = async (req, res) => {
  try {
    const {
      hours,
      numExercise,
      articulos,
      recursosDescargable,
      certificacion,
    } = req.body;

    const courseDetails = {
      hours,
      numExercise,
      articulos,
      recursosDescargable,
      certificacion,
    };
    const data = await courseDetailsService.addCourseDetails(courseDetails);
    return response(data, res);
  } catch (error) {
    serverError.message = error
    return response(serverError,res);  }
};

const updateCourseDetails = async (req, res) => {
  try {
    const {
      hours,
      numExercise,
      articulos,
      recursosDescargable,
      certificacion,
    } = req.body;

    const courseDetails = {
      hours,
      numExercise,
      articulos,
      recursosDescargable,
      certificacion,
    };
    const data = await courseDetailsService.updateCourseDetails(
      courseDetails,
      req.params.courseId
    );
    return response(data, res);
  } catch (error) {
    serverError.message = error
    return response(serverError,res);  }
};
module.exports = {
  addCourseDetails,
  updateCourseDetails,
};
