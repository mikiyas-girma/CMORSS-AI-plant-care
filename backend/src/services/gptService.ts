import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getCareSuggestion = async (plantName: string, weatherData: any, chatHistory: any[] = []) => {
  try {
    // Create the complete messages array by combining the system prompt and user inputs
    const messages = [
      { role: "system", content: "You are a plant care expert." },
      { role: "system", content: "Make your answer concise, with a max of 200 words." },
      ...chatHistory, // Add chat history if available
      {
        role: "user",
        content: `What is the best way to care for a ${plantName} plant in ${weatherData.temperature}°C and ${weatherData.humidity}% humidity?
                  The plant will receive ${weatherData.sunlightHours} hours of sunlight per day.`
      },
    ];

    // Send the request to OpenAI
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages, // Include the message array
      stream: false,
      max_tokens: 250,
      n: 1,
      temperature: 0.4,
    });

    const careSuggestions = res.choices[0].message.content;
    console.log('Care suggestion from AI:', careSuggestions);
    return careSuggestions;

  } catch (error) {
    console.error('Error while fetching care suggestion from AI:', error);
    throw new Error('Failed to get care suggestion from AI');
  }
};

interface IuserQuery {
    prompt: string;
    plantName: string | null;
    weatherData: {
        temperature: number | string;
        humidity: number | string;
        sunlightHours: number | string;
    } | null;
}

export const aiChatService = async (userQuery: IuserQuery, chatHistory: any[] = []) => {
  try {
    // Prepare the messages array
    const systemPrompt = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "system", content: "Keep the responses concise, with a max of 200 words." },
    ];

    if (userQuery.plantName && userQuery.weatherData) {
        // If the user query includes plant details, add it to the chat history
        const plantDetails: string = `What is the best way to care for a ${userQuery.plantName} plant in 
                                     ${userQuery.weatherData.temperature}°C and ${userQuery.weatherData.humidity}% humidity?
                                     The plant will receive ${userQuery.weatherData.sunlightHours} hours of sunlight per day.`;
        chatHistory.push({ role: "user", content: plantDetails });
    }

    console.log("chat history", chatHistory);

    // Trim the chat history to keep only the last 4 entries
    const trimmedHistory = chatHistory.slice(-4);

    // Add the user's current query
    const messages = [
      ...systemPrompt,    // Include the system prompt
      ...trimmedHistory,  // Include the last 4 entries of chat history
      { role: "user", content: userQuery.prompt }, // Add the current user query
    ];

    // Send the request to OpenAI
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      stream: false,
      max_tokens: 250,
      n: 1,
      temperature: 0.4,
    });

    // Get the AI's response
    const aiResponse = res.choices[0].message.content;
    // Return the updated chat history including the new user query and AI response
    return [...trimmedHistory, { role: "user", content: userQuery }, { role: "assistant", content: aiResponse }];

  } catch (error) {
    console.error('Error while communicating with AI:', error);
    throw new Error('Failed to communicate with AI');
  }
};

