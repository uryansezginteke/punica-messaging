import WebSocket from 'ws';

const userMap: Map<string, WebSocket> = new Map();

export { userMap };
export * from './action';
