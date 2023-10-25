const constant = require("../utils/constant");
const {courseState} = require("../utils/states");
const { isEmpty } = require("../helpers/validate");
const { sendResponse } = require("../utils/CustomResponse");

class course_service {
  constructor(course) {
    this.course = course;
  }

  async addCourse(course) {
    let validate = isEmpty(Object.values(course));
    if (validate) return constant.reqValidationError;
    const data = await this.course.addCourse(course);
    return sendResponse(constant.reqCreated, data);
  }

  async getAllCourses() {
    let data = await this.course.getAllCourses();
    data = data.filter((obj)=>obj.state != courseState[2] && obj.state != courseState[3])
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }

  async getCourse(courseId) {
    const data = await this.course.getCourse(courseId);
    if (!data || data.length == 0) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }

  async updateCourse(updatedCourse, courseId) {
    let validate = isEmpty(Object.values(updatedCourse));
    if (validate) return constant.reqValidationError;
    const data = await this.course.updateCourse(updatedCourse, courseId);
    return sendResponse(constant.success, data);
  }

  async getTotalStudents() {
    const data = await this.course.getTotalStudents();
    if (!data || data.length == 0) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  async updateCourseImage(image, courseId) {
    let validate = isEmpty(Object.values(image));
    if (validate) return constant.reqValidationError;
    const data = await this.course.updateCourseImage(image, courseId);
    return sendResponse(constant.success,data)
  }
  async deleteCourse(courseId) {
    const data = await this.course.deleteCourse(courseId);
    if(data[0]=== 0)return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
}

module.exports = { course_service };
