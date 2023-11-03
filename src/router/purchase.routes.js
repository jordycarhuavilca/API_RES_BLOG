const { Router } = require("express");
const route = Router();
const purchase = require("../controllers/purchase.controller.js");
const {googleVerifyToken} = require('../middleware/authToken.js')

route.post('/checkout/express/course/:courseId',googleVerifyToken,purchase.addPurchase)
module.exports = route