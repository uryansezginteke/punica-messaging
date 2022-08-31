import messages from '..';

describe('messages tests', () => {
  test('messages should be not null', () => {
    expect(messages).not.toBeNull();
  });

  test('topic message handler should be not null', () => {
    expect(messages['topic']).not.toBeNull();
  });

  test('chat message handler should be not null', () => {
    expect(messages['chat']).not.toBeNull();
  });
});
