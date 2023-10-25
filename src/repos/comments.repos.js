const user = require("../database/models/user");
class commentRepos {
  constructor(comment) {
    this.comment = comment;
  }
  async addComment(comment) {
    return await this.comment.create(comment);
  }
  async getlistComments(courseId) {
    return await this.comment.findAll({
      where: {
        courseId: courseId,
      },
      include: {
        model: user,
        attributes: { exclude: ["typeUser","state","userId"] },
      },
    });
  }
  async updateComment(comment, commentId) {
    return await this.comment.update(comment, {
      where: {
        commentId: commentId,
      },
    });
  }
}
module.exports = { commentRepos };
