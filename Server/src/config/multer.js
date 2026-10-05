const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(path.__dirname, "../uploads"));
  },
  filename: (req, res, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(File.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter = (req,file,cb) =>{
    let allowedFiles = ["image/png","image/jpg","image/jpeg","image/webp"];
    if(allowedFiles.includes(file.mimetype)){
        cb(null,true);
    }else {
        cb(new Error("Only JPG,JPEG,PNG and WEBP images are allowed",false));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2*1024*1024},
});
module.exports = upload;
