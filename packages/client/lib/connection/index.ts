import { BaseListener } from '@punica/common';

class Connection extends BaseListener {
  static EVENT_MESSAGE: string = 'WEB_SOCKET_MESSAGE';

  private _webSocket: WebSocket;
  private _messages: Array<any>;

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
    if (this._messages.length > 0) {
      this._messages.forEach((message) => {
        this.sendMessage(message);
      });
      this._messages = [];
    }
  };

  /**
   *
   * @param e
   */
  private onError = (e: any) => {};

  /**
   *
   * @param e
   */
  private onClose = (e: any) => {
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
  public constructor() {
    super();
  }

  /**
   *
   * @param data
   */
  public sendMessage(data: any) {
    if (this._webSocket.readyState != WebSocket.OPEN) {
      this._messages.push(data);
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
    this._messages = [];

    this.addListener();
  }
}

export default Connection;
