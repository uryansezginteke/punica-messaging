import { channel } from '..';

/**
 *
 * @param {string} topic
 */
const action = (topic: string): void => {
  if (!topic) {
    throw new Error('topic cannot be null');
  }

  channel.delete(topic);
};

export default action;
