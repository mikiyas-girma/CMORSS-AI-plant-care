import { Request, Response } from "express";
import { gptImageData } from "../services/ai/gpt.service.js";
import { geminiImageData } from "../services/ai/gemini.service.js";
import { plantIdImageData } from "../services/ai/plantId.service.js";

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
    if (!model) model = "gemini";
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

    if (!data.is_plant) return res.status(422).json({ message: "Not a plant" });
    return res.status(200).json(data);
  } catch (error: any) {
    console.error(error);
    error instanceof TypeError
      ? res.status(400).json({ message: error.message })
      : res
          .status(error.status || 500)
          .json({ message: error.message || "Server error" });
  }
};
