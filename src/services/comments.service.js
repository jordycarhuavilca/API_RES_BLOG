class comment_Service {
  constructor(comment) {
    this.comment = comment;
  }
  async addComment(comment,courseId) {
    comment.courseId = courseId
    const data = await this.comment.addComment(comment);
    return data
  }
  async getlistComments(courseId) {
    const data = await this.comment.getlistComments(courseId);
    return data
  }
  async updateComment(comment, commentId) {
    const data = await this.comment.updateComment(comment, commentId);
    return data
  }
}

module.exports = { comment_Service };
