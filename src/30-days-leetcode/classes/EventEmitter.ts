type ICallback = (...args: any[]) => any;

type ISubscription = {
  unsubscribe: () => void;
};

class EventEmitter {
  constructor(public hash = new Map<string, ICallback[]>()) {}

  subscribe(eventName: string, callback: ICallback): ISubscription {
    if (!this.hash.has(eventName)) {
      this.hash.set(eventName, []);
    }
    this.hash.get(eventName)?.push(callback);
    return {
      unsubscribe: () => {
        this.hash.set(
          eventName,
          this.hash.get(eventName)!?.filter((cb) => cb !== callback)
        );
      },
    };
  }

  emit(eventName: string, args: any[] = []): any[] {
    if (!this.hash.has(eventName)) return [];
    return this.hash.get(eventName)!?.map((cb) => cb(...args));
  }
}
