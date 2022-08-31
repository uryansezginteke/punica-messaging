import { topicMap, addTopic, deleteTopic, getTopic } from '..';

describe('topic tests', () => {
  test('topic should be not null', () => {
    expect(topicMap).not.toBeNull();
  });

  test('addTopic should be not null', () => {
    expect(addTopic).not.toBeNull();
  });

  test('deleteTopic should be not null', () => {
    expect(deleteTopic).not.toBeNull();
  });

  test('getTopic should be not null', () => {
    expect(getTopic).not.toBeNull();
  });
});
