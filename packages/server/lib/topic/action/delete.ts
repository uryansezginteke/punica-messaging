import { topicMap } from '../index';

/**
 *
 * @param {string} userKey
 */
const action = (userKey: string): void => {
  if (!userKey) {
    throw new Error('userKey cannot be null');
  }

  let deleteKeys: Array<string> = null;

  topicMap.forEach((value: Array<string>, key: string) => {
    const newValue = value.filter((user) => user != userKey);

    topicMap.set(key, newValue);

    if (newValue.length == 0) {
      if (!deleteKeys) {
        deleteKeys = [];
      }

      deleteKeys.push(key);
    }
  });

  deleteKeys?.forEach((key) => {
    topicMap.delete(key);
  });

  deleteKeys = null;
};

export default action;
