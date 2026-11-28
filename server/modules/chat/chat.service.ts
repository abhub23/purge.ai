import axios from 'axios';
import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { google } from '@ai-sdk/google';
import { Prompt } from '../../constants/constants';
import { LLM_MODEL } from '../../lib/config';

export async function fetchPullRequestDiff(url: string): Promise<string> {
  const response = await axios.get(`${url}.diff`);
  return response.data;
}

export function createReviewStream(diff: string, messages: UIMessage[]) {
  const systemPrompt = Prompt(diff);

  return streamText({
    model: google(LLM_MODEL),
    messages: convertToModelMessages(messages),
    system: systemPrompt,
  });
}
