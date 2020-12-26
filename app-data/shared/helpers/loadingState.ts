import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useDelayedLoadingState(
  showDelay = 200,
  minDisplayTime = 0,
  initialValue = false
): [boolean, boolean, Dispatch<SetStateAction<boolean>>] {
  const [isLoading, setIsLoading] = useState<boolean>(initialValue);
  const [loaderStartedAt, setLoaderStartedAt] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    let t: number | undefined;
    if (isLoading && loaderStartedAt === undefined) {
      t = window.setTimeout(() => setLoaderStartedAt(millis()), showDelay);
    } else if (!isLoading && loaderStartedAt) {
      t = window.setTimeout(
        () => setLoaderStartedAt(undefined),
        Math.max(0, loaderStartedAt + minDisplayTime - millis())
      );
    }
    return (): void => window.clearTimeout(t);
  }, [isLoading, loaderStartedAt, showDelay, minDisplayTime]);

  const showLoader = loaderStartedAt !== undefined;
  return [isLoading, showLoader, setIsLoading];
}

const millis = (): number =>
  window.performance && window.performance.now
    ? window.performance.now()
    : +Date();
