import { MessageHandler } from '.';

interface IMessage {
  [key: string]: MessageHandler;
}

export default IMessage;
