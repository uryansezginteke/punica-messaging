interface IObserver<T> {
  topic: string;
  update: (data: T) => void;
}

export default IObserver;
