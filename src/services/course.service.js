const constant = require("../utils/constant");
const {courseState} = require("../utils/states");
const { isEmpty } = require("../helpers/validate");
const { sendResponse } = require("../utils/CustomResponse");

class course_service {
  constructor(course) {
    this.course = course;
  }
  
  async addCourse(course) {
    if (typeof course !== 'object') throw Error("it's not an object")
    let validate = isEmpty(Object.values(course));
    if (validate) return constant.reqValidationError;
    const data = await this.course.addCourse(course);
    return sendResponse(constant.reqCreated, data);
  }

  async getCourse(courseId) {
    const data = await this.course.getCourse(courseId);
    if (!data || data.length == 0) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  
  async getCoursesByTopic(topicName) {
    const data = await this.course.getCoursesByTopic(topicName);
    if (!data || data.length == 0) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }

  async updateCourse(updatedCourse, courseId) {
    if (typeof updatedCourse !== 'object') throw Error("it's not an object")
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
    if (typeof image !== 'object') throw Error("it's not an object")
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
  async buscarCurso(courseName) {
    let validate = isEmpty(courseName);
    if (validate) return constant.reqValidationError;
    const data = await this.course.buscarCurso(courseName);
    return sendResponse(constant.success,data)
  }
  async listCategoryAndSubs(){
    const data = await this.course.listCategoryAndSubs();
    if (!data || data.length == 0) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  async getCategoryAndSubs(categoryValue,subCategoryValue){
    const data = await this.course.getCategoryAndSubs(categoryValue,subCategoryValue);
    if (!data || data.length == 0) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
}

module.exports = { course_service };
