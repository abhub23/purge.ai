import { UIMessage } from 'ai';

export type ChatReqBody = {
  text: string;
  messages: UIMessage[];
}
