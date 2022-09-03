import { Channel } from 'amqplib';

const channel: Map<string, Channel> = new Map();

export { channel };
export * from './action';
