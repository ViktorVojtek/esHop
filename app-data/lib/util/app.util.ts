import { useEffect, useState } from 'react';

export const useIsClient: () => boolean = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  return isClient;
};

export const useStorage: () => Storage | null = () => {
  if (process.browser) {
    return window.localStorage;
  }

  return null;
};
