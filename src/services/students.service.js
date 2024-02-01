const constant = require("../utils/constant");
const errorHandler = require('../helpers/errorHandler')
const validate = require('../helpers/validate')

class student_service {
  constructor(student) {
    this.student = student;
  }
  async addStudent(student) {
    const data = await this.student.addStudent(student);
    return data
  }
  async getStudent(studentId) {
    const data = await this.student.getStudent(studentId);
    return data

  }
  async getStudentCourses(studentId) {
    const data = await this.student.getStudentCourses(studentId);
    return data
  }
  async updateStudent(updateStudent, studentId) {
    const data = await this.student.updateStudent(updateStudent, studentId);
    return data

  }
  async updateStudentImage(image, studentId) {
    const data = await this.student.updateStudentImage(image, studentId);
    return data
  }
  async deleteStudent(studentId) {
    const data = await this.student.deleteStudent(studentId);
    return data
  }
}
module.exports = {student_service};
