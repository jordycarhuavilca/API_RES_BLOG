const express = require("express");
const morgan = require('morgan')
const cors = require("cors");
require('dotenv').config();
const courseRoute = require("./router/course.routes.js");
const commentRoute = require("./router/comments.routes.js");
const purchaseRoute = require("./router/purchase.routes.js");
const userRoute = require("./router/user.routes.js");

const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/course',courseRoute)
app.use('/comment',commentRoute)
app.use('/payment',purchaseRoute)
app.use('/user',userRoute)
module.exports = app;
