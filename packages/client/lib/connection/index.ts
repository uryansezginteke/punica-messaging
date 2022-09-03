import { BaseListener } from '@punica/common';
import { IMessage } from '../model';

class Connection extends BaseListener {
  static EVENT_MESSAGE: string = 'WEB_SOCKET_MESSAGE';

  private _webSocket: WebSocket;
  private _messages: Map<string, IMessage>;
  private static _instance: Connection;

  /**
   *
   * @param e
   */
  private onMessage = (e: any) => {
    super.trigger(Connection.EVENT_MESSAGE, e);
  };

  /**
   *
   */
  private onOpen = () => {
    if (this._messages.keys.length > 0) {
      this._messages.forEach((data) => {
        this.sendMessage(data);
      });

      this._messages = new Map<string, IMessage>();
    }
  };

  /**
   *
   * @param e
   */
  private onError = (e: any) => {
    console.log(e);
  };

  /**
   *
   * @param e
   */
  private onClose = (e: any) => {
    console.log(e);

    switch (e.code) {
      case 1006:
        break;
    }
  };

  /**
   *
   */
  private addListener() {
    this._webSocket.onopen = this.onOpen;
    this._webSocket.onmessage = this.onMessage;
    this._webSocket.onerror = this.onError;
    this._webSocket.onclose = this.onClose;
  }

  /**
   *
   */
  private removeListener() {
    this._webSocket.onopen = null;
    this._webSocket.onmessage = null;
    this._webSocket.onerror = null;
    this._webSocket.onclose = null;
  }

  /**
   *
   */
  private constructor() {
    super();
  }

  /**
   *
   * @returns
   */
  public static getInstance(): Connection {
    if (!Connection._instance) {
      Connection._instance = new Connection();
    }

    return Connection._instance;
  }

  /**
   *
   * @param data
   */
  public sendMessage(data: IMessage) {
    if (this._webSocket.readyState != WebSocket.OPEN) {
      this._messages.set(data.type, data);

      return;
    }

    this._webSocket.send(JSON.stringify(data));
  }

  /**
   *
   */
  public disconnect() {
    this.removeListener();

    this._webSocket.close();
    this._webSocket = null;
  }

  /**
   *
   */
  public connect(url: string) {
    this._webSocket = new WebSocket(url);
    this._messages = new Map<string, IMessage>();

    this.addListener();
  }

  /**
   *
   * @returns
   */
  public isConnect(): boolean {
    if (!this._webSocket) {
      return false;
    }

    return this._webSocket.readyState == WebSocket.OPEN;
  }
}

export default Connection;
