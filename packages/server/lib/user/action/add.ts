import WebSocket from 'ws';
import { userMap } from '../index';

/**
 *
 * @param {string} userKey
 * @param {WebSocket} ws
 */
const action = (userKey: string, ws: WebSocket): void => {
  if (!userKey) {
    throw new Error('userKey cannot be null');
  }

  if (userMap.has(userKey)) {
    throw new Error('user already exist');
  }

  userMap.set(userKey, ws);
};

export default action;
