const { Router } = require("express");
const route = Router();
const user = require("../controllers/user.controller.js");
const upload = require("../lib/multer.lib.js");

route.post("/create-user",user.addUser);
route.post("/edit-photo/:userId", upload.single("image"), user.updateUserImage);
route.get("/:userId", user.getUser);
route.get("/:userId/my-courses", user.myCourses);
route.get("/:userId/list-courses", user.getIntructorCourses);
route.get("/get/purchaseCourses",user.getUserCourse)
route.delete("/:userId", user.deleteUser);
route.put("/:userId", user.updateUser);
module.exports = route;
