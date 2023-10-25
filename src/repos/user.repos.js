const { userState } = require("../utils/states");
const course = require("../database/models/course");
const userCourse = require("../database/models/userCourse");
class userRepos {
  constructor(user) {
    this.user = user;
  }
  async addUser(user) {
    return await this.user.create(user);
  }
  async getUser(userId) {
    return await this.user.findAll({
      where: {
        userId: userId,
      },
    });
  }
  async getIntructorCourses(userId) {
    return await this.user.findAll({
      where: {
        userId: userId,
      },
      include: {
        model: course,
        attributes: { exclude: ["createdAt", "deletedAt"] },
      },
    });
  }
  async getUserCourses(userId) {
    return userCourse.findAll({
      where: {
        userId: userId,
      },
      attributes : { exclude : ["courseId", "userId",'id']},
      include : {
        model:course
      }
    });
  }
  async updateUser(updatedUser, userId) {
    return await this.user.update(updatedUser, {
      where: {
        userId: userId,
      },
    });
  }
  async updateUserImage(image, userId) {
    return await this.user.update(image, {
      where: {
        userId: userId,
      },
    });
  }
  async deleteUser(userId) {
    return await this.user.update(
      { state: userState[1] },
      {
        where: {
          userId: userId,
        },
      }
    );
  }
}
module.exports = { userRepos };
