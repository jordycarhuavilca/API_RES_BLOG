const { Router } = require("express");
const route = Router();
const authController = require("../controllers/auth.controller");



route.get("/google", authController.generateAuthUrl);

route.get("/login", (req, res) => {
  res.status(500).json({ message: "error internal server" });
});

route.get("/google/callback", authController.getToken);

module.exports = route;
