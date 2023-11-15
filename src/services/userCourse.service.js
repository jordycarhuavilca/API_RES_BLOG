const constant = require("../utils/constant");
const { isEmpty } = require("../helpers/validate");
const { sendResponse } = require("../utils/CustomResponse");
class userCourse_Service {
  constructor(userCourse) {
    this.userCourse = userCourse;
  }
  async addUserCourse(userCourse,transaction) {
    const data = await this.userCourse.addUserCourse(userCourse,transaction);
    return sendResponse(constant.reqCreated, data);
  }
  async getUserCourse(){
    const data = await this.userCourse.getUserCourse()
    return sendResponse(constant.reqCreated, data);
  }
}

module.exports = { userCourse_Service };
