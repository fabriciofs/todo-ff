import Observer from './Observer';

export default class Observable {
  observers: Observer[];

  constructor() {
    this.observers = []
  }

  register(observer: Observer) {
    this.observers.push(observer)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notify(event: string, data: any) {
    for (const observer of this.observers) {
      if (observer.event === event) {
        observer.callback(data)
      }
    }
  }
}