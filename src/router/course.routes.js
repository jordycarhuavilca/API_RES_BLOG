const { Router } = require("express");
const course = require("../controllers/course.controller.js");
const route = Router();
const upload = require("../lib/multer.lib.js");

route.post("/create-course", course.addCourse);
route.post("/edit-photo/:courseId", upload.single("image"), course.updateCourseImage);


route.get("/info/:courseId?", course.getCourse);

route.get("/topic/:topicName",course.getCoursesByTopic);
route.get("/options/:category/:subCategory?",course.getCategoryAndSubs);

route.get("/search", course.buscarCurso);
route.get("/category", course.listCategoryAndSubs);


route.delete("/:courseId", course.deleteCourse);
route.put("/:courseId", course.updateCourse);

module.exports = route;