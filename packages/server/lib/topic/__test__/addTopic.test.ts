import { addTopic, getTopic } from '..';

describe('add topic tests', () => {
  test('add user-1 topics', () => {
    addTopic('user-1', ['topic-1']);

    expect(getTopic('topic-1')).toEqual(['user-1']);
  });

  test('add user-2 topics', () => {
    addTopic('user-2', ['topic-1']);

    expect(getTopic('topic-1')).toEqual(['user-1', 'user-2']);
  });

  test('add user-3 topics', () => {
    addTopic('user-3', ['topic-2']);

    expect(getTopic('topic-2')).toEqual(['user-3']);
  });

  test('add user-4 topics', () => {
    addTopic('user-4', ['topic-2', 'topic-4']);

    expect(getTopic('topic-2')).toEqual(['user-3', 'user-4']);
    expect(getTopic('topic-4')).toEqual(['user-4']);
  });
});
