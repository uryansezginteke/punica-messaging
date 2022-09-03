import { topicMap } from '..';

/**
 *
 * @param {string} userKey
 */
const action = (userKey: string): void => {
  if (!userKey) {
    throw new Error('userKey cannot be null');
  }

  topicMap.forEach((value: Array<string>, key: string) => {
    const newValue = value.filter((u) => u != userKey);

    topicMap.set(key, newValue);
  });
};

export default action;
