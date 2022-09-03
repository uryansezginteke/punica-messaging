import { userMap } from '..';

/**
 *
 * @param {string} userKey
 */
const action = (userKey: string): void => {
  if (!userMap.has(userKey)) {
    throw new Error('userKey not found');
  }

  userMap.delete(userKey);
};

export default action;
