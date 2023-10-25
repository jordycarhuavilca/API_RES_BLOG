const constant = require("../utils/constant");
const { isEmpty } = require("../helpers/validate");
const { sendResponse } = require("../utils/CustomResponse");
const model = require("../database/models/userCourse");
const { userRespos } = require("../repos/userCourse.repos");
const { user_Service } = require("./userCourse.service");

const userRespository = new userRespos(model);
const userService = new user_Service(userRespository);

class purchase_service {
  constructor(purchase) {
    this.purchase = purchase;
  }
  async addPurchase(purchase, transaction) {
    let validate = isEmpty(Object.values(purchase));
    if (validate) return constant.reqValidationError;

    try {
      //verificar si courseId y userId existe
      isEmpty(purchase.courseId);
      isEmpty(purchase.userId);
    } catch (error) {
      return sendResponse(constant.reqValidationError);
    }

    const data = await this.purchase.addPurchase(purchase, transaction);
    const { courseId, userId } = purchase;
    await userService.addUserCourse(
      { courseId: courseId, userId: userId },
      transaction
    );
    return sendResponse(constant.reqCreated, data);
  }
}
module.exports = { purchase_service };
