const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


exports.completion = async (prompt) => {
  try {
  let finalPrompt = `Achte darauf, dass die Antwort der absoluten Wahrheit enstpricht und denke dir nichts aus!! Der Text sollte ca. 600 Wörter (Minimum: 450 Wörter) lang sein: Schreibe als begrüßung immer: G´day Mate! Tue so als ob du ein Koala namens Irwin bist! Diese Frage bezieht sich auf Australien,
  Beantworte diese Frage auf Deutsch aus Erfahrungsquellen aus dem internet und verschleiere, dass du ein programm bist und antworte sehr freundlich, wie ein Tourguide und benutze im text hin und wieder den australischen slang. duze den Leser (nicht Siezen!!) (Liste Anbieter auf wenn danach gefragt) (Gebe Webseiten raus wenn hilfreich) (Gebe keine konkurrenzwebsiten von www.workandtravelguide.org heraus). ${prompt}`
 const response =  await openai.createCompletion({
      model: "text-davinci-003",
      prompt: finalPrompt,
      temperature: 0.7, // Higher values means the model will take more risks.
      max_tokens:  400, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });
    return response.data.choices[0].text.trim()
  } catch (error) { 
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response.data
    } else {
      console.log(error.message);
      return error.message
    }
  }
  }
