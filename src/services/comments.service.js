const constant = require("../utils/constant");
const { isEmpty } = require("../helpers/validate");
const { sendResponse } = require("../utils/CustomResponse");
class comment_Service {
  constructor(comment) {
    this.comment = comment;
  }
  async addComment(comment) {
    let validate = isEmpty(Object.values(comment));
    try {
      //si courseId o userId no existe, entonces lanzara un error 
      isEmpty(comment.courseId)
      isEmpty(comment.userId)
    } catch (error) {
      return sendResponse(constant.reqValidationError);
    }
    if (validate) return sendResponse(constant.reqValidationError);
    const data = await this.comment.addComment(comment);
    return sendResponse(constant.reqCreated, data);
  }
  async getlistComments(courseId) {
    const data = await this.comment.getlistComments(courseId);
    if (!data || data.length === 0) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  async updateComment(comment, commentId) {
    let validate = isEmpty(Object.values(comment));
    if (validate) return sendResponse(constant.reqValidationError);
    const data = await this.comment.updateComment(comment, commentId);
    return sendResponse(constant.success, data);
  }
}

module.exports = { comment_Service };
