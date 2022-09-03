import WebSocket from 'ws';
import { userMap } from '..';

/**
 *
 * @param {string} userKey
 * @returns {WebSocket}
 */
const action = (userKey: string): WebSocket => {
  if (!userKey) {
    throw new Error('userKey cannot be null');
  }

  return userMap.get(userKey);
};

export default action;
