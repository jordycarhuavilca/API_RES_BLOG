const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParse = require('cookie-parser')
const session = require('express-session')

require("dotenv").config();
const courseRoute = require("./router/course.routes.js");
const commentRoute = require("./router/comments.routes.js");
const purchaseRoute = require("./router/purchase.routes.js");
const userRoute = require("./router/user.routes.js");
const loginRoute = require("./router/login.routes.js");
const app = express();



app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse())
app.use(session({
    secret : process.env.SESSION_SECRET,
    secure: false, 
    httpOnly: true,
    resave: false, // don't save session if unmodified
    saveUninitialized: false,
    cookie : {
        secure: false,
        httpOnly : true,
    }
}))
app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true
    }
));

app.use("/course", courseRoute);
app.use("/comment", commentRoute);
app.use("/payment", purchaseRoute);
app.use("/user", userRoute);
app.use("/auth", loginRoute);


app.use((err, req, res, next) => {
    if (err) {
        const status = err.statusCode || 500
        const message = err.message  
    
        res.status(status).json({
          message: message,
        });
    }else next()
});

app.all('*',(req,res,next)=>{
    res.status(403).json({
        status : 'fail',
        message : `can't find ${req.originalUrl} on the server`
    })
})

module.exports = app;
