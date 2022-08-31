import { addTopic, deleteTopic, getTopic } from '..';

describe('delete topic tests', () => {
  beforeEach(() => {
    addTopic('user-1', ['topic-1']);
    addTopic('user-2', ['topic-1']);
    addTopic('user-3', ['topic-2']);
    addTopic('user-4', ['topic-2', 'topic-3']);
  });

  afterEach(() => {
    deleteTopic('user-1');
    deleteTopic('user-2');
    deleteTopic('user-3');
    deleteTopic('user-4');
  });

  test('delete user-1 topics', () => {
    deleteTopic('user-1');

    expect(getTopic('topic-1')).toEqual(['user-2']);
  });

  test('delete user-2 topics', () => {
    deleteTopic('user-2');

    expect(getTopic('topic-1')).toEqual(['user-1']);
  });

  test('delete user-3 topics', () => {
    deleteTopic('user-3');

    expect(getTopic('topic-2')).toEqual(['user-4']);
  });
});
