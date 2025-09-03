import { type Request, Router } from 'express';
import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { google } from '@ai-sdk/google';
import { checkCredits } from '../middlewares/checkCredits';
import axios from 'axios';
import { rejectionMessages, githubPrUrlRegex, Prompt } from '../constants/constants';
import { LLM_MODEL } from '../lib/config';

const router = Router();
router.use(checkCredits)

type ChatReqBody = {
  text: string;
  messages: UIMessage[];
}

router.post('/', async (req: any, res: any) => {

  const { text, messages }: ChatReqBody = req.body;
  const userId = req.authUser?.id || req.guestUser?.id

  if (!githubPrUrlRegex.test(text)) {
    const pick = Math.floor(Math.random() * 20)
    return res.status(200).send(rejectionMessages[pick]);
  }

  try {
    const RawDiff = await axios.get(`${text}.diff`)
    let systemPrompt = Prompt(RawDiff.data)

    const result = streamText({
      model: google(LLM_MODEL),
      messages: convertToModelMessages(messages),
      system: systemPrompt
    });

    result.pipeTextStreamToResponse(res);

  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;