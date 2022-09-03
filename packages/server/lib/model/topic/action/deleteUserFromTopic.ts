import { topicMap } from '..';

/**
 *
 * @param {string} topic
 * @param {string} userKey
 */
const action = (topic: string, userKey: string): void => {
  if (!topic) {
    throw new Error('topic cannot be null');
  }

  if (!userKey) {
    throw new Error('userKey cannot be null');
  }

  const users = topicMap.get(topic);
  const newValue = users.filter((u) => u != userKey);

  topicMap.set(topic, newValue);
};

export default action;
