import { IMessageData, MessageHandler } from '../../model';
import { addTopic } from '../../topic';
import { connect } from '../../consumer';
import { getTopic } from '../../topic';
import { getUser } from '../../user';

/**
 *
 * @param userKey
 * @param message
 */
const message: MessageHandler = (userKey: string, message: IMessageData) => {
  const { data } = message;
  const newTopics = addTopic(userKey, data);

  newTopics.forEach((topic) => {
    connectQueue(topic);
  });
};

/**
 *
 * @param topic
 */
const connectQueue = (topic: string) => {
  /**
   *
   * @param message
   */
  const callback = (message: string) => {
    const topicUsers = getTopic(topic);

    topicUsers?.forEach((userKey: string) => {
      const ws = getUser(userKey);

      ws?.send(JSON.stringify({ topic, value: JSON.stringify(message) }));
    });
  };

  connect(topic, callback);
};

export default message;
