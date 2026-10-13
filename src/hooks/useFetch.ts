// Fait avec Claude.ai

import { useCallback, useEffect, useRef, useState } from 'react';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: ReadonlyArray<unknown>,
): FetchState<T> & { reload: () => void } {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });
  const [reloadToken, setReloadToken] = useState(0);

  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  const reload = useCallback(() => {
    setReloadToken((token) => token + 1);
  }, []);

  const effectDeps = [...deps, reloadToken];

  useEffect(() => {
    const controller = new AbortController();
    setState((previous) => ({ ...previous, loading: true, error: null }));

    fetcherRef
      .current(controller.signal)
      .then((data) => {
        setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Erreur inconnue.'),
        });
      });

    return () => controller.abort();
  }, effectDeps);

  return { ...state, reload };
}
