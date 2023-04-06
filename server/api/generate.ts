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
