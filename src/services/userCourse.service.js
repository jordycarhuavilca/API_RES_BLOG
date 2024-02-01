
class userCourse_Service {
  constructor(userCourse) {
    this.userCourse = userCourse;
  }
  async addUserCourse(userCourse,transaction) {
    const data = await this.userCourse.addUserCourse(userCourse,transaction);
    return data
  }
  async getUserCourse(){
    const data = await this.userCourse.getUserCourse()
    return data
  }
}

module.exports = { userCourse_Service };
