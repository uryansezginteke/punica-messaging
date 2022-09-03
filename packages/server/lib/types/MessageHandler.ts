import { IMessageData } from '.';

type MessageHandler = (userKey: string, message: IMessageData) => void;

export default MessageHandler;
