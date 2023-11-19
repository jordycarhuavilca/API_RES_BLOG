const constant = require("../utils/constant");
const { isEmpty } = require("../helpers/validate");
const { sendResponse } = require("../utils/CustomResponse");



class purchase_service {
  constructor(purchase) {
    this.purchase = purchase;
  }
  async getNextPurchaseId(){
    const data = await this.purchase.getNextPurchaseId()
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  async addPurchase(purchase,transaction) {
    try {
      if (typeof purchase !== 'object') throw Error("it's not an object")
      let validate = isEmpty(Object.values(purchase));
      if (validate) return constant.reqValidationError;
      const data = await this.purchase.addPurchase(purchase, transaction);
      return sendResponse(constant.reqCreated, data);

    } catch (error) {
      console.log(error)
      return constant.reqValidationError;
    }
  }
  async addPurchaseDetail(list,transaction){
    if (!Array.isArray(list)) throw Error("it's not list")
    const data = await this.purchase.addPurchaseDetail(list,transaction);
    return sendResponse(constant.reqCreated, data);  
  }

  async getAllPurchase() {
    const data = await this.purchase.getAllPurchase();
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }

  async addToCarrito(userIdCourseId) {
    const data = await this.purchase.addToCarrito(userIdCourseId);
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }

  async deleteFromCarrito(carritoCod) {
    const data = await this.purchase.deleteFromCarrito(carritoCod);
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  async getAllCourseCarrito(userId) {
    const data = await this.purchase.getAllCourseCarrito(userId);
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  async addToFavorite(userIdCourseId) {
    const data = await this.purchase.addToFavorite(userIdCourseId);
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  async deleteFromFavorite(favoritosId) {
    const data = await this.purchase.deleteFromFavorite(favoritosId);
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
  async getCourseFavorite(userId) {
    const data = await this.purchase.getCourseFavorite(userId);
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }



}
module.exports = { purchase_service };
