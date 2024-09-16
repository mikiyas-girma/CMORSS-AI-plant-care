import { IPlant } from "../interfaces/IPlant.js";
import { Plant } from "../models/plant.model.js";
import User from "../models/user.model.js";
import uploadImage from "../utils/uploadImage.js";

function validateFields<T>(
  data: Partial<T>,
  requiredFields: Array<keyof T>,
  require = true
) {
  if (require) {
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) {
        throw new Error(`Missing required field: ${String(field)}`);
      }
    }
  } else {
    for (const field of Object.keys(data)) {
      if (!requiredFields.includes(field as keyof T)) {
        throw new Error(`field not allowed: ${field}`);
      }
    }
  }
}

export const createPlantService = async (plantData: any) => {
  const requiredFields: Array<keyof IPlant> = [
    "userId",
    "plantName",
    "geoLocation",
  ];
  validateFields<IPlant>(plantData, requiredFields);
  // Validate nested details fields
  const requiredDetailsFields: Array<keyof IPlant["details"]> = [
    "name",
    "common_names",
    "description",
    "images",
    "edible_parts",
    "best_light_condition",
    "best_soil_type",
    "common_uses",
    "cultural_significance",
    "toxicity",
    "best_watering",
    "url",
  ];

  if (plantData.details)
    validateFields<IPlant["details"]>(plantData.details, requiredDetailsFields);

  const user = await User.findById(plantData.userId);
  if (!user) throw new Error("User not found");
  if (plantData.plantImages && plantData.plantImages.length > 0) {
    const uploadedImages = await Promise.all(
      plantData.plantImages.map(async (image: string, index: number) => {
        const { imageUrl } = await uploadImage({
          image,
          name: `image-${plantData.plantName}-${index}`.replace(/\s/g, "-"),
          folder:
            `users/${plantData.userId}/plants/${plantData.plantName}`.replace(
              /\s/g,
              "-"
            ),
        });
        return imageUrl;
      })
    );
    plantData.plantImages = uploadedImages;
  }
  const newPlant = new Plant({ ...plantData });
  await newPlant.save();
  return newPlant;
};

export const getPlantService = async (plantId: string) => {
  const plant = await Plant.findById(plantId);
  if (!plant) throw new Error("Plant not found");
  return plant;
};

export const getAllPlantsService = async () => {
  const plants = await Plant.find();
  if (!plants) throw new Error("No Plant found");
  return plants;
};

export const getUserPlantsService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  const plants = await Plant.find({ userId });
  if (!plants) throw new Error("No Plant found");
  return plants;
};

export const updatePlantService = async (plantId: string, plantData: any) => {
  const plant = await Plant.findById(plantId);
  if (!plant) throw new Error("Plant not found");
  const allowedFields: Array<keyof IPlant> = [
    "title",
    "locationDetails",
    "health",
    "notes",
    "careHistory",
  ];

  validateFields<IPlant>(plantData, allowedFields, false);

  const updatedPlant = await Plant.findByIdAndUpdate(plantId, plantData, {
    new: true,
  });

  return updatedPlant;
};

export const deletePlantService = async (plantId: string) => {
  const plant = await Plant.findById(plantId);
  if (!plant) throw new Error("Plant not found");
  await Plant.findByIdAndDelete(plantId);
};
