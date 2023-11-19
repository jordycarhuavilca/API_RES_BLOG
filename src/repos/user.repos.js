const { userState } = require("../utils/states");
const course = require("../database/models/course");
const userCourse = require("../database/models/userCourse");
const comments = require("../database/models/comments");
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
    try {
      return await course.findAll({
        where: {
          userId: userId,
        },
        attributes: { exclude: ["createdAt", "deletedAt"] },
        include: [
          {
            model : require('../database/models/user'),
            attributes: ["userId", "image","nameUser","family_name"] ,
          },
          {
            model : comments
          },
          {
            model : userCourse
          }
        ],
      });
    } catch (error) {
      throw new Error(error) 
    }
  }
  async myCourses(userId) {
    return await userCourse.findAll({
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
