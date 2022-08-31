import WebSocket from "ws";
import { userMap } from "../index";

/**
 *
 * @param {string} userKey
 * @returns {WebSocket}
 */
const action = (userKey: string): WebSocket => {
  if (!userKey) {
    throw new Error("userKey cannot be null");
  }

  if (!userMap.has(userKey)) {
    throw new Error("user not found");
  }

  return userMap.get(userKey);
};

export default action;
