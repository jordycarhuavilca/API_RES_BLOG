const model = require("../database/models/purchase.js");
const { serverError } = require("../utils/constant.js");
const { response } = require("../utils/CustomResponse.js");
const { purchaseRepos } = require("../repos/purchase.repos.js");
const { purchase_service } = require("../services/purchase.service.js");
const sequelize = require("../database/DB_connect.js");

const purchaseRepository = new purchaseRepos(model);
const purchaseService = new purchase_service(purchaseRepository);

const addPurchase = async (req, res) => {
  try {
    const data = await sequelize.transaction(async (t) => {
      req.body.courseId = req.params.courseId;
      return await purchaseService.addPurchase(req.body, t);
    });
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  }
};

module.exports = {
  addPurchase,
};
