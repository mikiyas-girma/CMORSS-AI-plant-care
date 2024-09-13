import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { plantJsonFormat } from "../../constants/index.js";
import { parseJson } from "../../utils/parseJson.js";
import { PlantDetails } from "../../types/models/plant.types.js";

// Function to convert image URL to Base64
async function convertImageToBase64(imageUrl: string): Promise<string> {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");
    return buffer.toString("base64");
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    throw error;
  }
}

// Function to convert Base64 data into the format Gemini API accepts
function base64ToGenerativePart(base64Data: string, mimeType: string) {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

// Main function to generate content with images
export const geminiImageData = async (images: string[], description = "") => {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    console.error("Google API key not found");
    return null;
  }

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // Convert images to Base64 and create Generative Parts
  const imageParts = await Promise.all(
    images.map(async (imageUrl) => {
      const base64Image = await convertImageToBase64(imageUrl);
      const extension = imageUrl.split('.').pop()?.toLowerCase(); 
      return base64ToGenerativePart(base64Image, `image/${extension}`);
    })
  );

  // Define the prompt with description (if provided)
  const prompt = `reply with a valid json string following this format ${plantJsonFormat} representing ${
    description ? "this description and " : ""
  } the plant in the image`;

  // Send the prompt and images to the Gemini model
  try {
    const generatedContent = await model.generateContent([prompt, ...imageParts]);

    const data = generatedContent.response.text();

    return parseJson(data) as PlantDetails & { is_plant: boolean };
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
};
