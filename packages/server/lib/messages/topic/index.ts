import { Channel } from 'amqplib';
import { connect } from '../../consumer';
import { IMessageData, MessageHandler } from '../../types';
import {
  getTopic,
  getUser,
  addUserTopic,
  addTopicForUser,
  getUserTopic,
  addChannel,
  deleteUserFromTopic
} from '../../model';

/**
 *
 * @param userKey
 * @param message
 */
const message: MessageHandler = (userKey: string, message: IMessageData) => {
  const { data: topics } = message;
  const oldTopics = getUserTopic(userKey);
  const newTopics = addTopicForUser(userKey, topics);
  const userDeleteTopics = oldTopics.filter((t) => !topics.includes(t));

  newTopics.forEach(async (t) => {
    const channel = await connectQueue(t);

    addChannel(t, channel);
  });

  userDeleteTopics.forEach((t) => {
    deleteUserFromTopic(t, userKey);
  });

  addUserTopic(userKey, topics);

  disconnectQuene();
};

/**
 *
 * @param topic
 * @returns
 */
const connectQueue = async (topic: string): Promise<Channel> => {
  return new Promise((resolve) => {
    /**
     *
     * @param message
     */
    const callback = (message: string) => {
      const users = getTopic(topic);

      users?.forEach((u: string) => {
        const ws = getUser(u);

        ws?.send(JSON.stringify({ topic, value: message }));
      });
    };

    connect(topic, callback).then((c) => {
      resolve(c);
    });
  });
};

/**
 *
 */
const disconnectQuene = () => {};

export default message;
