declare module 'redux-persist';
declare module 'redux-persist/es/storage' {
  interface Storage {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  }
  const storage: Storage;
  export default storage;
}

