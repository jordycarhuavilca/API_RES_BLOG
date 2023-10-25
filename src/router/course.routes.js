const { Router } = require("express");
const course = require("../controllers/course.controller.js");
const route = Router();
const upload = require("../lib/multer.lib.js");

route.post("/create-course", course.addCourse);
route.post("/edit-photo/:courseId", upload.single("image"), course.updateCourseImage);
route.get("/list-courses", course.getAllCourses);
route.get("/:courseId", course.getCourse);
route.delete("/:courseId", course.deleteCourse);
route.put("/:courseId", course.updateCourse);
module.exports = route;
