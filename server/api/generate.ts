export default defineEventHandler(async (event) => {
  try {
    console.log(event);
    const body = await readBody(event);
    const { prompt } = body;
    const url =
      "https://api.openai.com/v1/engines/text-davinci-002/completions";

    const payload = {
      prompt: `Please verify the following statement: ${prompt}. Please provide evidence to support your response, including the source(s) of the information, any relevant URLs, and any other factors that should be considered in determining the authenticity of the statement.`,
      max_tokens: 1024,
      n: 1,
      stop: "\n",
    };
    console.log(payload);
    const response: Response = await $fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    console.log(response);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
  }
});
