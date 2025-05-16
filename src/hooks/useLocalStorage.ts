export function useLocalStorage<T>(key: string) {
  const isLocalStorageAvailable = typeof window !== "undefined" && typeof localStorage !== "undefined";

  const getStoredValue = (): T | null => {
    if (!isLocalStorageAvailable) {
      return null;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Erreur lors de la lecture de localStorage pour la clé "${key}":`, error);
      return null;
    }
  };

  const setStoredValue = (value: T): void => {
    if (!isLocalStorageAvailable) {
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Erreur lors de l'écriture dans localStorage pour la clé "${key}":`, error);
    }
  };

  const deleteStoredValue = (): void => {
    if (!isLocalStorageAvailable) {
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erreur lors de la suppression de localStorage pour la clé "${key}":`, error);
    }
  };

  return [getStoredValue, setStoredValue, deleteStoredValue] as const;
}
