const constant = require("../utils/constant");
const errorHandler = require('../helpers/errorHandler')
const validate = require('../helpers/validate')

class purchase_service {
  constructor(purchase) {
    this.purchase = purchase;
  }
  async getNextPurchaseId(){
    const data = await this.purchase.getNextPurchaseId()
    if (!data) {
      const {message,statusCode} = constant.recordNotFound
      throw new errorHandler.NotFoundError(message,statusCode)
    }     
    return data
  }
  async addPurchase(purchase,transaction) {
    try {
      const data = await this.purchase.addPurchase(purchase, transaction);
      return data
    } catch (error) {
      const {message,statusCode} = constant.serverError
      throw new errorHandler.InternalServerError(message,statusCode)
    }
  }
  async addPurchaseDetail(list,transaction){
    const data = await this.purchase.addPurchaseDetail(list,transaction);
    return data
  }

  async getAllPurchase() {
    const data = await this.purchase.getAllPurchase();
    
    return data
  }

  async addToCarrito(userIdCourseId) {
    const data = await this.purchase.addToCarrito(userIdCourseId);
    return data
  }

  async deleteFromCarrito(carritoCod) {
    const data = await this.purchase.deleteFromCarrito(carritoCod);
    return data
  }
  async getAllCourseCarrito(userId) {
    const data = await this.purchase.getAllCourseCarrito(userId);
  
    return data
  }
  async addToFavorite(userIdCourseId) {
    const {userId , courseId} = userIdCourseId
    const listCourse = await this.purchase.getCourseFavorite(userId)
    let data = {}
    if (listCourse.length == 0){
      data = await this.purchase.addToFavorite(userIdCourseId);
      return data
    }

    if (listCourse.length == 1) {
      const data = listCourse[0].courseId == courseId?
       await this.purchase.deleteFromFavorite(courseId)
      : await this.purchase.addToFavorite(userIdCourseId);
      return data
    }

    if(validate.isEqual(listCourse,courseId,"courseId")) {
      return await this.purchase.deleteFromFavorite(courseId)
    }else{
      return await this.purchase.addToFavorite(userIdCourseId);
    }
  }
  async deleteFromFavorite(courseId) {
    const data = await this.purchase.deleteFromFavorite(courseId);

    return data
  }
  async getCourseFavorite(userId) {
    const data = await this.purchase.getCourseFavorite(userId);
    

    return data
  }



}
module.exports = { purchase_service };
