const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathway = path.join(__dirname, "../public/uploads");
    cb(null, pathway);
  },
  filename: (req, file, cb) => {
    const nameImg = `${uuidv4()}${path.extname(file.originalname)}`;
    req.nameImg = nameImg;

    cb(null, nameImg);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file);
    cb(null, true);
  },
});

module.exports = upload;
