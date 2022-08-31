import { addTopic, getTopic } from '..';

describe('get topic tests', () => {
  beforeAll(() => {
    addTopic('user-1', ['topic-1']);
    addTopic('user-2', ['topic-1']);
    addTopic('user-3', ['topic-2']);
    addTopic('user-4', ['topic-2', 'topic-3']);
  });

  test('get topic-1', () => {
    expect(getTopic('topic-1')).toEqual(['user-1', 'user-2']);
  });
});
