const course = require('../database/models/course')
const purchaseDetail = require("../database/models/purchaseDetail");
class purchaseRepos {
  constructor(purchase) {
    this.purchase = purchase;
  }
  async getNextPurchaseId(){
    const list =await this.purchase.findAll();
    return list.sort((a, b) => b.numpurchase - a.numpurchase)[0].numpurchase +1;
  }
  async addPurchase(purchase,transaction) {
    return await this.purchase.create(purchase, { transaction: transaction });
  }
  async addPurchaseDetail(list,transaction){
    return await purchaseDetail.bulkCreate(list, { transaction: transaction });
  }
  async getAllPurchase(){
    return await this.purchase.findAll({
      attribue : { exclude : ['courseId']},
      include : {
        model : course,
        attribue : { exclude : ['createdAt','updatedAt','deletedAt','state']}
      }
    })
  }
}
module.exports = { purchaseRepos };
