const memoryStorage: Record<string, Record<string, unknown>> = {};

export class DataStorage {
  static async setNamespace<T = unknown>(namespace: string, key: string, value: T): Promise<void> {
    if (!memoryStorage[namespace]) {
      memoryStorage[namespace] = {};
    }

    memoryStorage[namespace][key] = value;
  }

  static async getNamespace<T = unknown>(namespace: string, key: string): Promise<T> {
    return memoryStorage[namespace]?.[key] as T;
  }
}
