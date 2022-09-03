import { userTopicMap } from '..';

/**
 *
 * @param {string} userKey
 */
const action = (userKey: string): void => {
  if (!userTopicMap.has(userKey)) {
    throw new Error('userKey not found');
  }

  userTopicMap.delete(userKey);
};

export default action;
