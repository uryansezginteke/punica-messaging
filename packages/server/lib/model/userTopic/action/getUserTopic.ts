import { userTopicMap } from '..';

/**
 *
 * @param {string} userKey
 * @returns {WebSocket}
 */
const action = (userKey: string): Array<string> => {
  if (!userKey) {
    throw new Error('userKey cannot be null');
  }

  return userTopicMap.get(userKey);
};

export default action;
