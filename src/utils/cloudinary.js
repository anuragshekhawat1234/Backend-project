import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
const uploadOnCloudinary = async (loacalFilePath) => {
    try {
        if (!loacalFilePath) return null
        //upload the file to cloudinary
        const response = await cloudinary.uploader.upload(loacalFilePath, {
            folder: "users",
            resource_type: "image",
        })
        //file has been uploaded successfully
        // console.log("file uploaded successfuuly", response.url);
        fs.unlinkSync(loacalFilePath)// remove the localy saved tempoarly
        return response;
    } catch (error) {
        fs.unlinkSync(loacalFilePath)// remove the localy saved tempoarly 
        //files as the upload operation got failed
        return null;

    }
}
export { uploadOnCloudinary }