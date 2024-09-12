import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

/**
 * Uploads an image to Cloudinary and returns the upload result object and optimized image URL.
 * @param image - The image to be uploaded.
 * @param name - The name to be assigned to the uploaded image.
 * @param folder - The folder in which the image should be stored. (make sure to include the trailing slash)
 * @returns An object containing the upload result and the optimized image URL.
 */
export default async function (image: string, name: string, folder = "") {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload the image
  const uploadResult = await cloudinary.uploader
    .upload(image, {
      public_id: `agricare/${folder}${name}`,
    })
    .catch((error) => {
      console.log(error);
    });

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(`agricare/${folder}${name}`, {
    fetch_format: "auto",
    quality: "auto",
  });

  return { uploadResult, imageUrl: optimizeUrl };
}
