const { Router } = require("express");
const route = Router();
const authController = require("../controllers/auth.controller");
const constant = require('../utils/constant.js')

route.get("/google", authController.generateAuthUrl);
route.get("/google/callback",(req,res,next)=>{
    const errorUrl = req.query.error
    if (errorUrl) {
       return res.redirect('http://localhost:5173/')
    }
    else next()

}, authController.setCredentials);


route.post("/logout", authController.logout);

module.exports = route;
