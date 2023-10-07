const express = require("express");
const morgan = require('morgan')
const cors = require("cors");
require('dotenv').config();
const router = require("./router/article.routes.js");

const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api',router)


module.exports = app;
