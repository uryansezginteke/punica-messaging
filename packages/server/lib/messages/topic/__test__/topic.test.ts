import topic from '..';
import { topicMap } from '../../../topic';

describe('topic message tests', () => {
  test('topic message should be not null', () => {
    expect(topic).not.toBeNull();
  });

  test('add user-1 topics', () => {
    topic('user-1', { type: 'topic', data: ['topic-1'] });

    expect(topicMap.get('topic-1')).toEqual(['user-1']);
  });

  test('add user-2 topics', () => {
    topic('user-2', { type: 'topic', data: ['topic-1'] });

    expect(topicMap.get('topic-1')).toEqual(['user-1', 'user-2']);
  });

  test('add user-3 topics', () => {
    topic('user-3', { type: 'topic', data: ['topic-2'] });

    expect(topicMap.get('topic-2')).toEqual(['user-3']);
  });

  test('add user-4 topics', () => {
    topic('user-4', { type: 'topic', data: ['topic-2', 'topic-4'] });

    expect(topicMap.get('topic-2')).toEqual(['user-3', 'user-4']);
    expect(topicMap.get('topic-4')).toEqual(['user-4']);
  });
});
