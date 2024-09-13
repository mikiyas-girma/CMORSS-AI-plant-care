import axios from 'axios';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const getCareSuggestion = async (species: string, weatherData: any) => {
    
  try {
    const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a plant care expert."},
            { role: "system", content: "make your answer concise since you can only respond max of 150 words."},
            { role: "user", 
              content: "What is the best way to care for a " + species + 
                        " plant" + " in " + weatherData.temperature + "°C" + " and " +
                        weatherData.humidity + "% humidity?" + " The plant will receive " +
                        weatherData.sunlightHours + " hours of sunlight per day."
            },
        ],
        stream: false,
        max_completion_tokens: 250,
        n: 1,
        temperature: 0.4,

    });

    const careSuggestions = res.choices[0].message.content as string;

    return careSuggestions;
    
  } catch (error) {
    throw new Error('Failed to get care suggestion from AI');
  }
};

