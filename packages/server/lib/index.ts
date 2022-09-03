import messages from './messages';
import WebSocket from 'ws';
import { IncomingMessage } from 'http';
import { IMessageData } from './types';
import {
  addUser,
  deleteUser,
  deleteUserFromTopics,
  deleteUserTopic
} from './model';

const PORT = 8080;

try {
  const webSocketServer = new WebSocket.Server({ port: PORT });

  /**
   *
   * @param ws
   * @param req
   */
  const onConnection = (ws: WebSocket, req: IncomingMessage) => {
    const key = req.headers['sec-websocket-key'] as string;

    addUser(key, ws);

    /**
     *
     * @param data
     */
    const onMessage = (data: string) => {
      const message: IMessageData = JSON.parse(data);
      const handler = messages[message.type];

      if (!handler) {
        return;
      }

      handler(key, message);
    };

    /**
     *
     */
    const onClose = () => {
      deleteUser(key);
      deleteUserFromTopics(key);
      deleteUserTopic(key);

      //TODO disconnect empty topic
    };

    ws.on('message', onMessage);
    ws.on('close', onClose);
  };

  webSocketServer.on('connection', onConnection);
} catch (e: any) {
  console.log(e.mesaage);
}
