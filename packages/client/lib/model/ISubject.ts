import { IMessage, IObserver } from '.';

interface ISubject<T> {
  attach(observer: IObserver<T>): void;
  detach(observer: IObserver<T>): void;
  notify(message: IMessage): void;
}

export default ISubject;
