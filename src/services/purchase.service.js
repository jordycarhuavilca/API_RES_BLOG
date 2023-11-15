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
    const data = await this.purchase.addPurchaseDetail(list,transaction);
    return sendResponse(constant.reqCreated, data);  
  }

  async getAllPurchase() {
    const data = await this.purchase.getAllPurchase();
    if (!data) return constant.recordNotFound;
    return sendResponse(constant.success, data);
  }
}
module.exports = { purchase_service };
