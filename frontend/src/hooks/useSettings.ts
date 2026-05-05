import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Settings } from '../types';

const defaultSettings: Settings = {
  aiPersonality: 'default',
  responseFormat: 'default',
  codeBlocks: {
    syntax: true,
    lineNumbers: false,
  },
  ollamaModel: '',
};

function normalizeSettings(value: Partial<Settings>): Settings {
  return {
    ...defaultSettings,
    ...value,
    ollamaModel: typeof value.ollamaModel === 'string' ? value.ollamaModel : defaultSettings.ollamaModel,
    codeBlocks: { ...defaultSettings.codeBlocks, ...value.codeBlocks },
  };
}

export const useSettings = () => {
  const [stored, setStored] = useLocalStorage<Settings>('chat-settings', defaultSettings);
  const settings = useMemo(() => normalizeSettings(stored), [stored]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setStored((prev) => normalizeSettings({ ...prev, ...newSettings }));
  };

  return {
    settings,
    updateSettings,
  };
};
