const constant = require("../utils/contant");
const { isEmpty } = require("../helpers/validate");
const { sendResponse } = require("../utils/CustomResponse");

class courseDetails_service {
  constructor(courseDetails) {
    this.courseDetails = courseDetails;
  }
  async addCourseDetails(courseDetails) {
    if (typeof courseDetails !== 'object') throw Error("it's not an object")
    let validate = isEmpty(Object.values(courseDetails));
    if (validate) return constant.reqValidationError;
    const data = await this.courseDetails.addCourseDetails(courseDetails);
    return sendResponse(constant.reqCreated, data);
  }
  async getCourseDetails(courseId) {
    const data = await this.courseDetails.getCourseDetails(courseId);
    if (!data || data.length == 0) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  async updateCourseDetails(updatedCourseDetails, courseId) {
    if (typeof updatedCourseDetails !== 'object') throw Error("it's not an object")
    let validate = isEmpty(Object.values(updatedCourseDetails));
    if (validate) return constant.reqValidationError;
    const data = await this.courseDetails.updateCourseDetails(
      updatedCourseDetails,
      courseId
    ); 
    return sendResponse(constant.success, data);
  }
}
module.exports = { courseDetails_service };
