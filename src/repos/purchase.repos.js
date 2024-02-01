const course = require('../database/models/course')
const user = require('../database/models/user')
const comments = require('../database/models/comments')
const purchaseDetail = require("../database/models/purchaseDetail");
const carrito = require("../database/models/carrito");
const favoritesCourse = require("../database/models/favoritesCourse");
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
  async addToCarrito(userIdCourseId) {
    return await carrito.create(userIdCourseId);
  }
  async getAllCourseCarrito(userId){
    return await carrito.findAll({
      where : {
        userId : userId
      },
      attribue : { exclude : ['courseId','userId']},
      include : {
        model : course,
        attribue : { exclude : ['createdAt','updatedAt','deletedAt','state']},
        include : [{
          model :user 
        },
        {
          model : comments
        }
      ]
      }
    })
  }
  async deleteFromCarrito(carritoCod) {
    return await carrito.destroy({
      where : {
        carritoCod :carritoCod
      }
    });
  }


  async addToFavorite(userIdCourseId) {
    return await favoritesCourse.create(userIdCourseId);
  }
  async deleteFromFavorite(courseId) {
    return await favoritesCourse.destroy({
      where : {
        courseId :courseId
      }
    });
  }
  async getCourseFavorite(userId){
    return await favoritesCourse.findAll({
      where : {
        userId : userId
      },
      attribue : { exclude : ['courseId','userId']},
      include : {
        model : course,
        attribue : { exclude : ['createdAt','updatedAt','deletedAt','state']},
        include : [{
          model :user 
        },
        {
          model : comments
        }
      ]
      }
    })
  }
}
module.exports = { purchaseRepos };
