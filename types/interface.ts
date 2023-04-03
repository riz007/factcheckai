export interface OpenAICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logprobs: null;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
export interface OpenAICompletionPayload {
  model: string;
  prompt: string;
  max_tokens: number;
  n: number;
}
export interface GenerateApiResponse {
  text?: string;
  error?: string | null;
  choices?: string[];
}
