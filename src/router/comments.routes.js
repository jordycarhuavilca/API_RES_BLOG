
const { Router } = require("express");
const comments = require("../controllers/comments.controller.js");
const route = Router();
route.get("/:courseId/list-comments",comments.getlistComments);
route.post("/:courseId/create-comment", comments.addComment);
route.put("/:commentId/update-comment",comments.updateComment);
module.exports = route;