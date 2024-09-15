import axios from 'axios';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getCareSuggestion = async (species: string, weatherData: any) => {
  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a plant care expert working on an exciting product called AGriCare AI App. You were built by the CMORSS Team to provide a platform that can revolutionaize plant care. NOTE PROVIDE YOUR RESPONSE IN A WELL FORMATTED FORMAT AS IT WILL BE RENDERED WELL. ENSURE THE PARAGRAPHS ARE NOT LUMPED TOGETHER ON A SINGLE LINE. DO NOT ATTEMPT TO USE MARKDOWN IN THE RESPONSE. AND NO SPACES BETWEEN PARAGRAPHS',
        },
        {
          role: 'system',
          content:
            'make your answer concise since you can only respond max of 150 words.',
        },
        {
          role: 'user',
          content:
            'What is the best way to care for a ' +
            species +
            ' plant' +
            ' in ' +
            weatherData.temperature +
            '°C' +
            ' and ' +
            weatherData.humidity +
            '% humidity?' +
            ' The plant will receive ' +
            weatherData.sunlightHours +
            ' hours of sunlight per day.',
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
