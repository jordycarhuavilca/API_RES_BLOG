
class purchaseRepos {
  constructor(purchase) {
    this.purchase = purchase;
  }
  async addPurchase(purchase,transaction) {
    return await this.purchase.create(purchase, { transaction: transaction });
}
}
module.exports = { purchaseRepos };
