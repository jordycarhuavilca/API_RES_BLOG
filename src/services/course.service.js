const constant = require("../utils/constant");
const errorHandler = require('../helpers/errorHandler')
const handleOrmErrs = require('../helpers/handleOrmErrs')
const sequelize = require('sequelize')
const states = require('../utils/states');
const validate = require("../helpers/validate");
class course_service {
  constructor(course) {
    this.course = course;
  }
  
  async addCourse(course) {
    try {
      const data = await handleOrmErrs.handleErr(this.course.addCourse(course),sequelize.Error)
      return data 
      
    } catch (error) {
      
      if (error.statusCode) throw new errorHandler.ValidateError(error.message,error.statusCode)
      throw new errorHandler.InternalServerError(constant.serverError.message,500)

    }
  }

  async listCourses(){
    return await this.course.listCourses()
  }


  async getCourse(courseId) {
      const data = await handleOrmErrs.handleErr(this.course.getCourse(courseId),sequelize.Error);
      if (validate.isEmpty(data)) return []
      if (data[0].state == states.courseState[3]) {
        return []
      }
      return data
  }
  
  async getCoursesByTopic(topicName) {
   
      const data = await  handleOrmErrs.handleErr(this.course.getCoursesByTopic(topicName),sequelize.Error);
      return data
    
  }

  async updateCourse(updatedCourse, courseId) {
    try {
      const data = await  handleOrmErrs.handleErr(this.course.updateCourse(updatedCourse, courseId),sequelize.Error);
      return data
    } catch (error) {

      if (error.statusCode) throw new errorHandler.ValidateError(error.message,error.statusCode)
      throw new errorHandler.InternalServerError(constant.serverError.message,500)

    }
  }

  async getTotalStudents() {
    const data = await  handleOrmErrs.handleErr(this.course.getTotalStudents(),sequelize.Error);
    return data
  }
  async updateCourseImage(nameImg, courseId) {
    try {
      const course = {image : nameImg}
      const data = await  handleOrmErrs.handleErr(this.course.updateCourseImage(course, courseId),sequelize.Error);
      console.log("data "+JSON.stringify(data))
      return data
    
    } catch (error) {
      
      if (error.statusCode) throw new errorHandler.ValidateError(error.message,error.statusCode)
      throw new errorHandler.InternalServerError(constant.serverError.message,500)

    }
  }
  async deleteCourse(courseId) {
    try{

      const data = await  handleOrmErrs.handleErr(this.course.deleteCourse(courseId),sequelize.Error);
      
      return data
    
    } catch (error) {
      
      if (error.statusCode) throw new errorHandler.ValidateError(error.message,error.statusCode)
      throw new errorHandler.InternalServerError(constant.serverError.message,500)

    }
  }
  async buscarCurso(courseName) {
    const data = await  handleOrmErrs.handleErr(this.course.buscarCurso(courseName),sequelize.Error);
    return data
  }
  async listCategoryAndSubs(){
    const data = await  handleOrmErrs.handleErr(this.course.listCategoryAndSubs(),sequelize.Error);
    return data
  }
  async getCourseByCateAndSubs(categoryValue,subCategoryValue){
    const data = await  handleOrmErrs.handleErr(this.course.getCourseByCateAndSubs(categoryValue,subCategoryValue),sequelize.Error);
    return data
  }
}

module.exports = { course_service };
