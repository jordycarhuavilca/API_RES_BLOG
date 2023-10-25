const model = require("../database/models/comments.js");
const { serverError } = require("../utils/constant.js");
const { response } = require("../utils/CustomResponse.js");
const { commentRepos } = require("../repos/comments.repos.js");
const { comment_Service } = require("../services/comments.service.js");

const commentRepository = new commentRepos(model);
const commentService = new comment_Service(commentRepository);

const addComment = async (req, res) => {
  try {
    req.body.courseId = req.params.courseId
    const data = await commentService.addComment(req.body);
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  }
};
const getlistComments = async (req, res) => {
  try {
    const data = await commentService.getlistComments(req.params.courseId);
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  }
};
const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const data = await commentService.updateComment(req.body, commentId);
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  }
};

module.exports = {
  addComment,
  updateComment,
  getlistComments,
};
