type Cache = {
  get: <T>(key: string) => T | undefined;
  set: <T>(key: string, value: T) => void;
  clear: (key: string) => void;
};

const cache: Cache = {
  get: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  clear: (key) => {
    localStorage.removeItem(key);
  },
};

export default cache;
