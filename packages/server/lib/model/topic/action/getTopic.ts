import { topicMap } from '..';

/**
 *
 * @param {string} topic
 * @returns {Array<string>}
 */
const action = (topic: string): Array<string> => {
  if (!topic) {
    throw new Error('topic cannot be null');
  }

  return topicMap.get(topic);
};

export default action;
