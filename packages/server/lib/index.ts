import messages from './messages';
import WebSocket from 'ws';
import { IncomingMessage } from 'http';
import { addUser, deleteUser } from './user';
import { IMessageData } from './model';
import { deleteTopic } from './topic';

try {
  const webSocketServer = new WebSocket.Server({ port: 8080 });

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
        console.error('type no recognized');
      }

      handler(key, message);
    };

    /**
     *
     */
    const onClose = () => {
      deleteUser(key);
      deleteTopic(key);
    };

    ws.on('message', onMessage);
    ws.on('close', onClose);
  };

  webSocketServer.on('connection', onConnection);
} catch (e: any) {
  console.log(e.mesaage);
}
