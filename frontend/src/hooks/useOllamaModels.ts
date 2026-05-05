import { useCallback, useEffect, useState } from 'react';
import { OllamaModelInfo } from '../types';
import { fetchOllamaModels } from '../utils/api';

export const useOllamaModels = () => {
  const [models, setModels] = useState<OllamaModelInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchOllamaModels();
      setModels(list);
    } catch (e) {
      setModels([]);
      setError(e instanceof Error ? e.message : 'Could not load models');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { models, loading, error, refresh };
};
