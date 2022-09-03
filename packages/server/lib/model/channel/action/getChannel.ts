import { channel } from '..';
import { Channel } from 'amqplib';

/**
 *
 * @param {string} topic
 * @returns {WebSocket}
 */
const action = (topic: string): Channel => {
  if (!topic) {
    throw new Error('topic cannot be null');
  }

  return channel.get(topic);
};

export default action;
