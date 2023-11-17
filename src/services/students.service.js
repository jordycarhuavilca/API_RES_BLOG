const constant = require("../utils/contant");
const { isEmpty } = require("../helpers/validate");
const { sendResponse } = require("../utils/CustomResponse");

class student_service {
  constructor(student) {
    this.student = student;
  }
  async addStudent(student) {
    if (typeof student !== 'object') throw Error("it's not an object")

    let isEmpty = isEmpty(Object.values(student));
    if (isEmpty) return constant.reqValidationError;
    const data = await this.student.addStudent(student);
    return sendResponse(constant.reqCreated,data)
  }
  async getStudent(studentId) {
    const data = await this.student.getStudent(studentId);
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success,data)

  }
  async getStudentCourses(studentId) {
    const data = await this.student.getStudentCourses(studentId);
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success,data)

  }
  async updateStudent(updateStudent, studentId) {
    if (typeof updateStudent !== 'object') throw Error("it's not an object")
    let isEmpty = isEmpty(Object.values(updateStudent));
    if (isEmpty) return constant.reqValidationError;
    const data = await this.student.updateStudent(updateStudent, studentId);
    return sendResponse(constant.success,data)

  }
  async updateStudentImage(image, studentId) {
    if (typeof image !== 'object') throw Error("it's not an object")
    let isEmpty = isEmpty(Object.values(image));
    if (isEmpty) return constant.reqValidationError;
    const data = await this.student.updateStudentImage(image, studentId);
    return sendResponse(constant.success,data)

  }
  async deleteStudent(studentId) {
    const data = await this.student.deleteStudent(studentId);
    return sendResponse(constant.success,data)
  }
}
module.exports = {student_service};
