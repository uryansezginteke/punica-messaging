import { IMessageData, MessageHandler } from '../../model';

/**
 *
 * @param userKey
 * @param message
 */
const message: MessageHandler = (userKey: string, message: IMessageData) => {
  const { data } = message;

  console.log(userKey, data);
};

export default message;
