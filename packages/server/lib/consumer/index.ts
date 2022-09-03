import amqp, { Channel } from 'amqplib';

/**
 *
 * @param queue
 * @param callback
 */
const connect = async (
  queue: string,
  callback: (message: string) => void
): Promise<Channel> => {
  return new Promise(async (resolve) => {
    const connection = await amqp.connect('amqp://localhost:5673');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    channel.consume(queue, (message) => {
      callback(message.content.toString());

      channel.ack(message);
    });

    resolve(channel);
  });
};

/**
 *
 * @param topic
 * @param channel
 */
const disconnect = async (topic: string, channel: Channel) => {
  channel.cancel(topic);
};

export { connect, disconnect };
