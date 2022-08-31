import { IObserver, ISubject } from './model';
import Connection from './connection';

class TopicManager implements ISubject<any> {
  private _url: string;
  private _connection: Connection;
  private _topicMap: Map<string, Array<(data: any) => void>>;
  private static _instance: TopicManager;

  /**
   *
   * @param e
   */
  private onMessage = (e: any) => {
    const data = JSON.parse(e.data as string);
    const { topic, value } = data;

    this.notify(topic, value);
  };

  /**
   *
   */
  private connect() {
    this._connection = new Connection();
    this._connection.on(Connection.EVENT_MESSAGE, this.onMessage);
    this._connection.connect(this._url);
  }

  /**
   *
   */
  private disconnect() {
    this._connection.off(Connection.EVENT_MESSAGE, this.onMessage);
    this._connection.disconnect();
    this._connection = null;
  }

  /**
   *
   * @param observer
   * @returns
   */
  private addObserver(observer: IObserver<any>) {
    const { topic, update } = observer;
    let callbacks = this._topicMap.get(topic);

    if (!callbacks) {
      callbacks = [];
    }

    callbacks.push(update);

    this._topicMap.set(topic, callbacks);

    if (this._topicMap.size == 1) {
      this.connect();
    }

    this._connection.sendMessage({
      type: 'topic',
      data: Array.from(this._topicMap.keys())
    });
  }

  /**
   *
   * @param observer
   * @returns
   */
  private removeObserver(observer: IObserver<any>) {
    const { topic, update } = observer;

    let callbacks = this._topicMap.get(topic);

    callbacks = callbacks.filter((u) => u != update);

    if (callbacks.length == 0) {
      this._topicMap.delete(topic);
    } else {
      this._topicMap.set(topic, callbacks);
    }

    this._connection.sendMessage({
      type: 'topic',
      data: this._topicMap.keys()
    });

    if (this._topicMap.size == 1) {
      this.disconnect();
    }
  }

  /**
   *
   */
  private constructor() {
    this._topicMap = new Map<string, Array<(data: string) => void>>();
  }

  /**
   *
   * @returns
   */
  public static getInstance(): TopicManager {
    if (!TopicManager._instance) {
      TopicManager._instance = new TopicManager();
    }

    return TopicManager._instance;
  }

  /**
   *
   * @param observer
   * @param args
   */
  public attach(
    observer: IObserver<any>,
    ...args: Array<IObserver<any>>
  ): void {
    if (observer) {
      this.addObserver(observer);
    }

    if (args && args.length > 0) {
      args.forEach((observer) => {
        this.addObserver(observer);
      });
    }
  }

  /**
   *
   * @param observer
   * @param args
   */
  public detach(
    observer: IObserver<any>,
    ...args: Array<IObserver<any>>
  ): void {
    if (observer) {
      this.removeObserver(observer);
    }

    if (args && args.length > 0) {
      args.forEach((observer) => {
        this.removeObserver(observer);
      });
    }
  }

  /**
   *
   * @param url
   */
  public url(url: string) {
    this._url = url;
  }

  /**
   *
   * @param topic
   * @param data
   */
  public notify(topic: string, data: any): void {
    const methods = this._topicMap.get(topic);

    methods?.forEach((u) => {
      u(data);
    });
  }
}

export default TopicManager;
