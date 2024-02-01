const constant = require("../utils/constant");
const errorHandler = require('../helpers/errorHandler')
const validate = require('../helpers/validate')

class courseDetails_service {
  constructor(courseDetails) {
    this.courseDetails = courseDetails;
  }
  async addCourseDetails(courseDetails) {
    const data = await this.courseDetails.addCourseDetails(courseDetails);
    return data
  }
  async getCourseDetails(courseId) {
    const data = await this.courseDetails.getCourseDetails(courseId);
    return data
  }
  async updateCourseDetails(updatedCourseDetails, courseId) {
  
    const data = await this.courseDetails.updateCourseDetails(
      updatedCourseDetails,
      courseId
    ); 
    return data
  }
}
module.exports = { courseDetails_service };
