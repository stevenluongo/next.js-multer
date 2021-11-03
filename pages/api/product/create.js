import nextConnect from "next-connect";
import multer from "multer";
const cloudinary = require('cloudinary').v2
const path = require('path');
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formatBufferTo64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer)

const storage = multer.memoryStorage();

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
}

const uploadFile = multer({ storage: storage, fileFilter: imageFilter, limits: {fileSize: 1000000} }).single("image");

const handler = 
    nextConnect()
    .use(uploadFile)
    .post(async(req, res) => {
        res.json({msg: "create route"})
});

export default handler;