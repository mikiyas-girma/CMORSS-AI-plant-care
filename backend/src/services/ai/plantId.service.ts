import axios, { AxiosRequestConfig } from "axios";
import { PlantDetails } from "../../types/models/plant.types";
import { sanitizeObject } from "../../utils/sanitizeObject.js";
const details = `?details=common_names,description,images,edible_parts,best_light_condition,best_soil_type,common_uses,cultural_significance,toxicity,best_watering,url`;

export const plantIdImageData = async (images: string[]) => {
  const body = JSON.stringify({
    images,
  });

  const config: AxiosRequestConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://plant.id/api/v3/identification" + details,
    headers: {
      "Api-Key": process.env.PLANT_ID_API_KEY,
      "Content-Type": "application/json",
    },
    data: body,
  };

  try {
    const res = (await axios(config)).data;
    const is_plant = res.result.is_plant.binary;
    const response = res.result.classification.suggestions[0];
    const { description, images, language, entity_id, ...data } =
      response.details;
    const newImages = response.details.images.map((image: any) => image.value);
    const name = response.name;

    const sanitizedData = sanitizeObject({
      description: description.value,
      is_plant,
      name,
      images: newImages,
      ...data,
    });

    return sanitizedData as PlantDetails & { is_plant: boolean };
  } catch (error) {
    console.error(error);
  }
};
