const { Router } = require("express");
const route = Router();
const purchase = require("../controllers/purchase.controller.js");


route.post('/checkout/express/course/:courseId',purchase.addPurchase)
module.exports = route