const model = require("../database/models/purchase.js");
const { serverError } = require("../utils/constant.js");
const { response } = require("../utils/CustomResponse.js");
const { purchaseRepos } = require("../repos/purchase.repos.js");
const { purchase_service } = require("../services/purchase.service.js");
const userCourseModel = require("../database/models/userCourse");
const { userCourseRespos } = require("../repos/userCourse.repos");
const { userCourse_Service } = require("../services/userCourse.service.js");
const sequelize = require("../database/DB_connect.js");

const purchaseRepository = new purchaseRepos(model);
const purchaseService = new purchase_service(purchaseRepository);

const userRespository = new userCourseRespos(userCourseModel);
const userService = new userCourse_Service(userRespository);




const addValueToList = (list,name,value) =>{
  for (let i = 0; i < list.length; i++) {
    list[i][name] = value
  }
  return list
}

const addPurchase = async (req, res) => {
  try {
      const userId = req.params.userId; 
      const nextId = await purchaseService.getNextPurchaseId()
      let newList = addValueToList(req.body,'userId',userId)
      newList = addValueToList(newList,'numpurchase',nextId.data)

      const data = await sequelize.transaction( async (t) => {
        const a = await purchaseService.addPurchase({userId : userId},t);
        await purchaseService.addPurchaseDetail(newList,t);
        await userService.addUserCourse(newList,t);
        return a
      });
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  }
};
const getAllPurchase = async (req,res) =>{
  try {
    const data = await purchaseService.getAllPurchase()
    return response(data, res);
  } catch (error) {
    serverError.message = error;
    return response(serverError, res);
  }
}
module.exports = {
  addPurchase,
  getAllPurchase
};
