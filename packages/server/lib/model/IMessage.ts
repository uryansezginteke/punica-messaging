import { MessageHandler } from './index';

interface IMessage {
  [key: string]: MessageHandler;
}

export default IMessage;
