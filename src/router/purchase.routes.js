const { Router } = require("express");
const route = Router();
const purchase = require("../controllers/purchase.controller.js");
const {googleVerifyToken} = require('../middleware/authToken.js')

route.post('/checkout/express/course/:userId',purchase.addPurchase)
route.get('/getAllPurchases',purchase.getAllPurchase)
module.exports = route