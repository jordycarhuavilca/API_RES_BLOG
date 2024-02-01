const model = require("../database/models/comments.js");
const constant= require("../utils/constant.js");
const { commentRepos } = require("../repos/comments.repos.js");
const { comment_Service } = require("../services/comments.service.js");

const commentRepository = new commentRepos(model);
const commentService = new comment_Service(commentRepository);

const addComment = async (req, res) => {
  try {
    const comment = req.body
    const courseId = req.params.courseId
    
    if (typeof comment !== 'object'
    || !comment || !courseId) 
    return res.status(constant.reqValidationError.statusCode)
    .json({message : constant.reqValidationError.message})
  
    const data = await commentService.addComment(comment,courseId);

    return res.status(constant.reqCreated.statusCode)
    .json({message : constant.reqCreated.message ,data : data})
      
  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message })

  }
};

const getlistComments = async (req, res) => {
  try {
    const data = await commentService.getlistComments(req.params.courseId);

    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message})

  }
};

const updateComment = async (req, res) => {
  try {
    const comment = req.body
  if (typeof comment !== 'object') res.status(constant.reqValidationError.statusCode)
    .json({message : constant.reqValidationError.message})

    const commentId = req.params.commentId;

    const data = await commentService.updateComment(comment, commentId);

    return res.status(constant.success.statusCode)
    .json({message : constant.success.message ,data : data})

  } catch (error) {

    return res.status(error.statusCode)
    .json({message : error.message})

  }
};

module.exports = {
  addComment,
  updateComment,
  getlistComments,
};
