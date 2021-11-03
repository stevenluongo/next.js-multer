import multer from "multer";
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const path = require('path');

const storage = multer.memoryStorage();

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
}

export const uploadFile = multer({ storage: storage, fileFilter: imageFilter, limits: {fileSize: 1000000} }).single("image");

export const formatBufferTo64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer)
