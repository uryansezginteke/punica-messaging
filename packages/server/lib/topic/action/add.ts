import { topicMap } from "..";

/**
 *
 * @param {string} userKey
 * @param {Array<string>} topics
 * @returns
 */
const action = (userKey: string, topics: Array<string>): Array<string> => {
  if (!userKey) {
    throw new Error("userKey cannot be null");
  }

  if (!topics) {
    throw new Error("topics cannot be null");
  }

  const newTopic: Array<string> = [];

  topics.forEach((topic: string) => {
    let users = topicMap.get(topic);
    if (!users) {
      users = [];

      newTopic.push(topic);
    }

    if (!users.includes(userKey)) {
      users.push(userKey);
    }

    topicMap.set(topic, users);
  });

  return newTopic;
};

export default action;
