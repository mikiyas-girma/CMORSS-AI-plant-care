import axios from 'axios';

export const getCareSuggestion = async (species: string, weatherData: any) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    const prompt = `Give care suggestions for a ${species} plant based on the following weather data: 
                    Temperature: ${weatherData.temperature}, 
                    Humidity: ${weatherData.humidity}, 
                    Sunlight Hours: ${weatherData.sunlightHours}`;

    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo',
        prompt,
        max_tokens: 100,
      },
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );

    const careSuggestions = response.data.choices[0].text;
    return parseCareSuggestion(careSuggestions);
  } catch (error) {
    throw new Error('Failed to get care suggestion from AI');
  }
};

const parseCareSuggestion = (text: string) => {

  return {
    waterFrequency: '2-3 days',
    sunlightHours: '6 hours',
    additionalTips: 'Ensure good drainage.',
  };
};
