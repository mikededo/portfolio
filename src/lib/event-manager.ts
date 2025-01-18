/* eslint-disable ts/no-unsafe-function-type */
type EventKey = keyof DocumentEventMap;

class _EventManager {
  private events: Map<EventKey, Map<Function, AbortController>> = new Map();

  public register<K extends EventKey>(event: K, listener: (ev: DocumentEventMap[K]) => any) {
    const currentEvents: Map<Function, AbortController> = this.events.get(event) ?? new Map();
    const newEvents = new Map([...currentEvents]);
    const controller = new AbortController();

    const previous = newEvents.get(listener);
    if (previous) {
      // We remove the previously registered listener
      previous.abort();
    }

    newEvents.set(listener, controller);
    this.events.set(event, newEvents);

    if (currentEvents.size === 0) {
      // No previous listeners, add the event listener
      document.addEventListener(event, (e) => {
        newEvents.keys().forEach((listener) => {
          listener(e);
        });
      }, { signal: controller.signal });
    }
  }

  public unregister<K extends EventKey>(event: K, listener: (ev: DocumentEventMap[K]) => any) {
    const currentEvents: Map<Function, AbortController> = this.events.get(event) ?? new Map();
    if (currentEvents.size === 0) {
      return;
    }

    const prev = currentEvents.get(listener);
    if (!prev) {
      return;
    }

    prev.abort();

    if (currentEvents.size === 1) {
      this.events.delete(event);
      return;
    }

    const newEvents = new Map([...currentEvents]);
    newEvents.delete(listener);
    this.events.set(event, newEvents);
  }
}

const instance = new _EventManager();

export const EventManager = instance;
