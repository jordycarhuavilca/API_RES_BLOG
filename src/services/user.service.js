const constant = require("../utils/constant");
const { isEmpty } = require("../helpers/validate");
const { sendResponse } = require("../utils/CustomResponse");
const {courseState} = require("../utils/states");

class user_service {
  constructor(user) {
    this.user = user;
  }
  async addUser(user) {
    if (typeof user !== 'object') throw Error("it's not an object")
    let validate = isEmpty(Object.values(user));
    if (validate) return constant.reqValidationError;
    const data = await this.user.addUser(user);
    return sendResponse(constant.reqCreated, data);
  }
  async getUser(userId){
    const data = await this.user.getUser(userId);
    if (!data || data.length == 0) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  async getIntructorCourses(userId) {
    try {
      const data = await this.user.getIntructorCourses(userId);
      if (data.length == 0)return constant.recordNotFound;
        const selectedData = data.filter((course)=>course.state !== courseState[2] && course.state !== courseState[3])
        return sendResponse(constant.success, selectedData);
    } catch (error) {
      throw new Error(error) 
    }
  }
  async myCourses(userId) {
    const data = await this.user.myCourses(userId);
    if (!data || data.length == 0) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  async updateUser(updatedUser, userId) {
    if (typeof updatedUser !== 'object') throw Error("it's not an object")
    let validate = isEmpty(Object.values(updatedUser));
    if (validate) return constant.reqValidationError;
    const data = await this.user.updateUser(updatedUser, userId);
    return sendResponse(constant.success, data);
  }
  async updateUserImage(image, userId) {
    if (typeof image !== 'object') throw Error("it's not an object")
    let validate = isEmpty(Object.values(image));
    if (validate) return constant.reqValidationError;
    const data = await this.user.updateUserImage(image, userId);
    return sendResponse(constant.success, data);
  }
  
  async deleteUser(userId) {
    const data = await this.user.deleteUser(userId);
    if(data[0]=== 0)return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
}
module.exports = { user_service };
