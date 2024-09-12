import { Request, Response } from "express";
import { gptImageData } from "../services/openai.js";
import { geminiImageData } from "../services/gemini.js";
import { plantIdImageData } from "../services/plantId.js";

let model: "plantId" | "gpt" | "gemini";

export const identifyPlant = async (req: Request, res: Response) => {
  try {
    const images = req.body.images;
    if (!images || images.length === 0)
      return res.status(400).json({ message: "No image provided" });

    if (
      !Array.isArray(images) ||
      !images.every((image) => typeof image === "string")
    ) {
      return res.status(400).json({ message: "Invalid image format" });
    }
    if (images.length > 3)
      return res.status(400).json({ message: "Too many images provided" });

    model = req.body.model;
    if (!model) model = "plantId";
    if (model !== "plantId" && model !== "gpt" && model !== "gemini")
      return res.status(400).json({ message: "Invalid model" });

    const getImageData =
      model === "gpt"
        ? gptImageData
        : model === "gemini"
        ? geminiImageData
        : model === "plantId"
        ? plantIdImageData
        : () => null;

    const data = await getImageData(images);
    if (!data)
      return res.status(500).json({ message: "Error retrieving image data" });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
