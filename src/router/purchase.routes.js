const { Router } = require("express");
const route = Router();
const purchase = require("../controllers/purchase.controller.js");
const {googleVerifyToken} = require('../middleware/authToken.js')

route.post('/checkout/express/course/:userId',purchase.addPurchase)
route.post('/cart/add',purchase.addToCarrito)
route.post('/wishlist/add',purchase.addToFavorite)

route.get('/getAllPurchases',purchase.getAllPurchase)
route.get('/cart/:userId',purchase.getAllCourseCarrito)
route.get('/wishlist/:userId',purchase.getCourseFavorite)

route.delete('/cart/destroy/:carritoCod',purchase.deleteFromCarrito)
route.delete('/wishlist/destroy/:favoritosId',purchase.deleteFromFavorite)
module.exports = route