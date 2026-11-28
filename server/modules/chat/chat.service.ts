import axios from 'axios';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { google } from '@ai-sdk/google';
import { Prompt } from '../../constants/constants.js';
import { LLM_MODEL } from '../../lib/config.js';

export async function fetchPullRequestDiff(url: string): Promise<string> {
  const response = await axios.get(`${url}.diff`);
  return response.data;
}

export async function createReviewStream(diff: string, messages: UIMessage[]) {
  const systemPrompt = Prompt(diff);
  const modelMessages = await convertToModelMessages(messages);

  return streamText({
    model: google(LLM_MODEL),
    messages: modelMessages,
    system: systemPrompt,
  });
}
