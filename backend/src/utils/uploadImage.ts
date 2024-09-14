import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

/**
 * Uploads a base64-encoded image to Cloudinary and returns the upload result object along with an optimized image URL.
 *
 * @param {string} image - The base64 encoded image to be uploaded. If the string doesn't include the base64 prefix (e.g., `data:image/jpeg;base64,`),
 * it will be automatically added based on the specified MIME type.
 * @param {string} name - The name to be assigned to the uploaded image.
 * @param {string} [folder] - (Optional) The folder in which the image should be stored within Cloudinary. Default is an empty string.
 * @param {string} [mime] - (Optional) The MIME type of the image. Default is "image/jpeg". This is used to construct the correct data URI prefix.
 *
 * @returns {Promise<{ uploadResult: any; imageUrl: string; }>} - A Promise that resolves with an object containing the Cloudinary upload result and the optimized image URL.
 */

type params = {
  image: string;
  name: string;
  folder?: string;
  mime?: string;
};

export default async function ({
  image,
  name,
  folder = "",
  mime = "image/jpeg",
}: params) {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Ensure the base64 string is correctly formatted
  const base64Prefix = `data:${mime};base64,`; // Add the correct data URI prefix based on the MIME type
  const base64Image = image.startsWith("data:") ? image : base64Prefix + image;

  // Upload the image to Cloudinary
  const uploadResult = await cloudinary.uploader
    .upload(base64Image, {
      public_id: `agricare/${folder}${name}`,
    })
    .catch((error) => {
      console.log(error);
    });

  // Optimize the image delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(`agricare/${folder}${name}`, {
    fetch_format: "auto",
    quality: "auto",
  });

  return { uploadResult, imageUrl: optimizeUrl };
}
