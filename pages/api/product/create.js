import nextConnect from "next-connect";
import cloudinary from "cloudinary";
import { uploadFile, formatBufferTo64 } from "../../../utils/multer";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = 
    nextConnect()
    .use(uploadFile)
    .post(async(req, res) => {
        if(!req.file) {
            res.json({msg: "You must upload a file !", error: true})
            return;
        }
        try {
            const file64 = formatBufferTo64(req.file);
            const { secure_url : image } = await cloudinary.v2.uploader.upload(file64.content, {folder: 'surf-district'});
            res.json({msg: "Image successfully uploaded !", url: image, error: false})
        } catch (err) {
            if(err) throw new Error(err);
            console.log(err)
            res.status(500).json({msg: "something went wrong :/", error: true})
        }
});

export default handler;

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
}; 