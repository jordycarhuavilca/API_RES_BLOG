const constant = require("../utils/constant");
const { isEmpty } = require("../helpers/validate");
const { sendResponse } = require("../utils/CustomResponse");
class user_Service {
  constructor(userCourse) {
    this.userCourse = userCourse;
  }
  async addUserCourse(userCourse,transaction) {
    const validate = isEmpty(Object.values(userCourse));
    if (validate) return constant.reqValidationError;
    const data = await this.userCourse.addUserCourse(userCourse,transaction);
    return sendResponse(constant.reqCreated, data);
  }
}

module.exports = { user_Service };
