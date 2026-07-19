import { type Request, type Response } from 'express';
import { rejectionMessages, githubPrUrlRegex } from '../../constants/constants.js';
import { fetchPullRequestDiff, createReviewStream } from './chat.service.js';
import type { ChatReqBody } from './chat.schema.js';

export const handleChat = async (req: Request, res: Response) => {
  const { text, messages }: ChatReqBody = req.body;

  if (!githubPrUrlRegex.test(text)) {
    const pick = Math.floor(Math.random() * 20);
    res.status(200).send(rejectionMessages[pick]);
    return;
  }

  try {
    const diff = await fetchPullRequestDiff(text);
    const result = createReviewStream(diff, messages);

    result.pipeTextStreamToResponse(res);

  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
