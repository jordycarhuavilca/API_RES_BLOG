const model = require("../database/models/purchase.js");
const constant = require("../utils/constant.js");
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
      return res.status(constant.reqCreated.statusCode)
      .json({message :constant.reqCreated.message, data : data })
    } catch (error) {
      return res.status(error.statusCode).json({message : error.message })
    }
};
const getAllPurchase = async (req,res) =>{
  try {
    const data = await purchaseService.getAllPurchase()
    return res.status(constant.success.statusCode)
    .json({message :constant.success.message, data : data })

  } catch (error) {
    return res.status(error.statusCode).json({message : error.message })
  }
}


const addToCarrito = async (req,res) =>{
  try {
    const data = await purchaseService.addToCarrito(req.body)
    return res.status(constant.reqCreated.statusCode)
    .json({message :constant.reqCreated.message, data : data })

  } catch (error) {
    return res.status(error.statusCode).json({message : error.message })
  }
}

const deleteFromCarrito = async (req,res) =>{
  try {
    const data = await purchaseService.deleteFromCarrito(req.params.carritoCod)
    return res.status(constant.success.statusCode)
    .json({message :constant.success.message, data : data })
  } catch (error) {
    return res.status(error.statusCode).json({message : error.message })

  }
}

const getAllCourseCarrito = async (req,res) =>{
  try {
    const data = await purchaseService.getAllCourseCarrito(req.params.userId)
    return res.status(constant.success.statusCode)
    .json({message :constant.success.message, data : data })
  } catch (error) {
    return res.status(error.statusCode).json({message : error.message })
  }
}

const addToFavorite = async (req,res) =>{
  try {
    let favCourse = req.body
    const data = await purchaseService.addToFavorite(favCourse)
    return res.status(constant.reqCreated.statusCode)
    .json({message :constant.reqCreated.message , data : data })
  } catch (error) {
    console.error(error.message)
    return res.status(error.statusCode).json({message : error.message })
  }
}
const deleteFromFavorite = async (req,res) =>{
  try {
    const data = await purchaseService.deleteFromFavorite(req.params.courseId)
    return res.status(constant.success.statusCode)
    .json({message :constant.success.message , data : data })
  } catch (error) {
    return res.status(error.statusCode).json({message : error.message })
  }
}

const getCourseFavorite = async (req,res) =>{
  try {
    const data = await purchaseService.getCourseFavorite(req.params.userId)
    return res.status(constant.success.statusCode)
    .json({message :constant.success.message , data : data })
  } catch (error) {
    return res.status(error.statusCode).json({message : error.message })

  }
}






module.exports = {
  addPurchase,
  getAllPurchase,
  addToCarrito,
  getAllCourseCarrito,
  addToFavorite,
  getCourseFavorite,
  deleteFromCarrito,
  deleteFromFavorite
};
