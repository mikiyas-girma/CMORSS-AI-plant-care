import OpenAI from "openai";
import { plantJsonFormat } from "../../constants/index.js";
import { parseJson } from "../../utils/parseJson.js";
import { PlantDetails } from "../../types/models/plant.types.js";

const openai = new OpenAI();

export const gptImageData = async (images: string[], description = "") => {
  const prompt = `reply with a valid json string following this format ${plantJsonFormat} representing ${
    description ? "this description and " : ""
  } the plant in the image`;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are plant identification AI, if the image contains a plant, please provide the details in JSON format else reply with '{\"is_plant\": false}'",
      },
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: {
              url: images[0],
            },
          },
          {
            ...(images[1]
              ? {
                  type: "image_url",
                  image_url: {
                    url: images[1],
                  },
                }
              : {
                  type: "text",
                  text: "",
                }),
          },
          {
            ...(images[2]
              ? {
                  type: "image_url",
                  image_url: {
                    url: images[2],
                  },
                }
              : {
                  type: "text",
                  text: "",
                }),
          },
        ],
      },
    ],
    model: "gpt-4o-mini",
  });

  const response = completion.choices[0].message.content;
  return parseJson(response) as PlantDetails & { is_plant: boolean };
};
