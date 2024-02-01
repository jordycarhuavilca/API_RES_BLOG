const {courseState} = require("../utils/states");
const encrypt = require("../lib/encrypt");

class user_service {
  constructor(user) {
    this.user = user;
  }

  async addUser(payload,refresh_token) {
    let hash = encrypt.encode(refresh_token);
    const { content, iv } = hash;
    const refresh_tokenCrypted = `${iv},${content}`;
    const user = {
      userId: payload.sub,
      user: payload.email,
      nameUser: payload.given_name,
      family_name: payload.family_name,
      refreshToken: refresh_tokenCrypted,
      image: payload.picture,
    };
    
    const data = await this.user.addUser(user);
    return data

  }
  
  async getUser(userId){
    const data = await this.user.getUser(userId);
    return data
  }
  async getIntructorCourses(userId) {
      const data = await this.user.getIntructorCourses(userId);
      const selectedData = data.filter((course)=>course.state !== courseState[2] && course.state !== courseState[3])
      return selectedData
  }
  async myCourses(userId) {
    const data = await this.user.myCourses(userId);
    return data
  }

  async updateUser(payload, userId,refresh_token) {

    let hash = encrypt.encode(refresh_token);
    const { content, iv } = hash;
    const refresh_tokenCrypted = `${iv},${content}`;
    const user = {
      userId: payload.sub,
      user: payload.email,
      nameUser: payload.given_name,
      family_name: payload.family_name,
      refreshToken: refresh_tokenCrypted,
      image: payload.picture,
    };

    const data = await this.user.updateUser(user, userId);
    return data
  }

  async updateUserImage(image, userId) {
    const data = await this.user.updateUserImage(image, userId);
    return data
  }
  
  async deleteUser(userId) {
    const data = await this.user.deleteUser(userId);
    return data
  }
}
module.exports = { user_service };
