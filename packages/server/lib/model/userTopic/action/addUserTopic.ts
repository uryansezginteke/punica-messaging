import { userTopicMap } from '..';

/**
 *
 * @param {string} userKey
 * @param {WebSocket} ws
 */
const action = (userKey: string, topics: Array<string>): void => {
  if (!userKey) {
    throw new Error('userKey cannot be null');
  }

  if (!topics) {
    throw new Error('topics cannot be null');
  }

  userTopicMap.set(userKey, topics);
};

export default action;
