import { IObserver } from '.';

interface ISubject<T> {
  attach(observer: IObserver<T>): void;
  detach(observer: IObserver<T>): void;
  notify(topic: string, data: any): void;
}

export default ISubject;
