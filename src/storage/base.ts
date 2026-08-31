/**
 * Local storage driver
 * Handles JSON serialization, expiration, and errors under SSR / privacy mode in a unified way
 */

interface StorageItem {
  value: any;
  /** Expiration timestamp in milliseconds; null means it never expires */
  expire: number | null;
}

/** Safely get the storage object; returns null under SSR or privacy mode */
function safeGetStorage(getter: () => Storage): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    return getter() ?? null;
  } catch {
    return null;
  }
}

/**
 * @func createStorage
 * @desc Create a set of storage methods (for internal use; unifies local / session implementations)
 * @param {Function} getter a function that returns the native Storage object
 * @returns {object} four methods: set / get / remove / clear
 */
export function createStorage(getter: () => Storage) {
  /**
   * Write data
   * @param key key name
   * @param value value, any JSON-serializable type
   * @param expire expiration time in milliseconds; omit to never expire
   */
  const set = (key: string, value: any, expire?: number): void => {
    if (!key) return;
    const storage = safeGetStorage(getter);
    if (!storage) return;
    const data: StorageItem = {
      value,
      expire: expire && expire > 0 ? Date.now() + expire : null,
    };
    try {
      storage.setItem(key, JSON.stringify(data));
    } catch {
      // Silently fail when the storage quota is exceeded
    }
  };

  /**
   * Read data; returns the default value when the data is missing or expired
   * @param key key name
   * @param defaultValue default value
   */
  const get = <T = any>(key: string, defaultValue: T | null = null): T | null => {
    if (!key) return defaultValue;
    const storage = safeGetStorage(getter);
    if (!storage) return defaultValue;
    let raw: string | null = null;
    try {
      raw = storage.getItem(key);
    } catch {
      return defaultValue;
    }
    if (raw === null) return defaultValue;

    try {
      const data = JSON.parse(raw);
      // Data written by this library carries the value / expire structure
      if (data !== null && typeof data === 'object' && 'value' in data && 'expire' in data) {
        if (data.expire !== null && Date.now() > data.expire) {
          try {
            storage.removeItem(key);
          } catch {
            // Ignore deletion errors
          }
          return defaultValue;
        }
        return data.value as T;
      }
      // Fall back to plain data written directly by external code
      return data as T;
    } catch {
      return raw as unknown as T;
    }
  };

  /** Remove the specified key */
  const remove = (key: string): void => {
    if (!key) return;
    const storage = safeGetStorage(getter);
    if (!storage) return;
    try {
      storage.removeItem(key);
    } catch {
      // Ignore errors
    }
  };

  /** Clear all keys */
  const clear = (): void => {
    const storage = safeGetStorage(getter);
    if (!storage) return;
    try {
      storage.clear();
    } catch {
      // Ignore errors
    }
  };

  return { set, get, remove, clear };
}
