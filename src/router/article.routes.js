const { Router } = require("express");
const {
  listArticle,
  crearArticle,
  getArticle,
  deleteArticle,
  updateArticle,
  uploadImg,
} = require("../controllers/article.controller.js");
const route = Router();
const upload = require("../lib/multer.lib.js");

route.post("/create", crearArticle);
route.post("/article/uploadImg/:idArticle", upload.single("image"), uploadImg);
route.get("/articles", listArticle);
route.get("/articles/:idArticle", getArticle);
route.delete("/articles/:idArticle", deleteArticle);
route.put("/articles/:idArticle", updateArticle);
module.exports = route;
