import { channel } from '..';
import { Channel } from 'amqplib';

/**
 *
 * @param {string} topic
 * @param {Channel} instance
 */
const action = (topic: string, instance: Channel): void => {
  if (!topic) {
    throw new Error('topic cannot be null');
  }

  if (!instance) {
    throw new Error('channel cannot be null');
  }

  channel.set(topic, instance);
};

export default action;
