export const localStorageStore = {
  /**
   * Save an item to localStorage
   * @param key - The key to store the value under
   * @param value - The value to store (will be stringified if not a string)
   */
  setItem: (key: string, value: unknown): void => {
    try {
      const serializedValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  /**
   * Retrieve an item from localStorage
   * @param key - The key of the item to retrieve
   * @returns The parsed value or `null` if the key does not exist
   */
  getItem: <T>(key: string): T | null => {
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  /**
   * Remove an item from localStorage
   * @param key - The key of the item to remove
   */
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};
