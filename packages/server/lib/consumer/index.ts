import amqp from 'amqplib';

/**
 *
 * @param queue
 * @param callback
 */
const connect = async (queue: string, callback: (message: string) => void) => {
  const connection = await amqp.connect('amqp://localhost:5673');
  const channel = await connection.createChannel();

  await channel.assertQueue(queue);

  channel.consume(queue, (message) => {
    callback(message.content.toString());

    channel.ack(message);
  });
};

export { connect };
