import {
  OpenAICompletionResponse,
  OpenAICompletionPayload,
} from "~~/types/interface";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { prompt } = body;
    const url = "https://api.openai.com/v1/completions";

    const payload: OpenAICompletionPayload = {
      model: "text-davinci-003",
      prompt: `Please verify the following statement: ${prompt}. Please provide evidence to support your response, including the source(s) of the information, any relevant URLs, and any other factors that should be considered in determining the authenticity of the statement.`,
      max_tokens: 1024,
      n: 1,
    };
    const response: OpenAICompletionResponse = await $fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    const text = response?.choices[0]?.text;
    // const text =
    //   "\n\nNo, COVID-19 is not a hoax and there is evidence of its existence and its detrimental impacts. According to the World Health Organization (WHO), as of July 1, 2020, there were over 11 million confirmed cases of COVID-19 throughout the world, resulting in over 528,000 deaths from the disease. https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports/ \n\nVarious international and local health authorities have also warned of the dangers associated with the virus, such as health risks associated with being infected and the need for physical distancing and other measures to limit spread of the virus. Furthermore, professional health organizations such as the American College of Physicians and the Centers for Disease Control and Prevention have released guidelines for health professionals and the public for recognition and response to the virus. https://hub.jhu.edu/2020/03/11/coronavirus-guidance/ \n\nGiven the overwhelming evidence, it is clear that COVID-19 is not a hoax.";
    const formattedText = text
      ?.replace(/\n/g, "<br>")
      .replace(
        /https?:\/\/[\w-]+\.[\w-]+\S*/g,
        (match) => `<a href="${match}">${match}</a>`
      )
      .replace(/"/g, ""); // remove quotation marks
    return formattedText;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
  }
});
