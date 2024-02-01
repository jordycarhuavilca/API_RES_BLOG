const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const errorHanlder = require('../helpers/errorHandler')
const constant = require('../utils/constant');

const typeImgExtension = ['jpe','jpg','jpeg','png']
const typeVideoExtension = ['mkv','mp4']
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let pathway = ""

    if (file.fieldname === "image" )  
    pathway = path.join(__dirname, "../public/uploads/images"); 

    if (file.fieldname === "video" )  
    pathway = path.join(__dirname, "../public/uploads/videos"); 
    
    cb(null, pathway);
  },
  filename: (req, file, cb) => {
    const nameImg = `${uuidv4()}${path.extname(file.originalname)}`;
    const multer = {
      nameImg
    }  
    req.multer = multer;
    
    cb(null, nameImg);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).split('.')[1]
    let isAllowedVideoExt =  typeVideoExtension.includes(extension)
    let isAllowedImgExt =  typeImgExtension.includes(extension)
    
    if (file.fieldname === "image" )  {
      if (isAllowedImgExt) cb(null, true) 
      else {
        const {statusCode} = constant.reqValidationError
        cb(new errorHanlder.ValidateError("only format image is allowed",statusCode), false);
      }
    }

    if (file.fieldname === "video")  {
      if (isAllowedVideoExt) cb(null, true) 
      else{
        const {statusCode} = constant.reqValidationError
        cb(new errorHanlder.ValidateError("only format video is allowed",statusCode), false);
      } 
    }
     
  },
});

module.exports = upload;
