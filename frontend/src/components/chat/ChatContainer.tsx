import { FC, useEffect, useRef, useState } from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { EmptyState } from './EmptyState';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { useChat } from '../../hooks/useChat';
import { useOllamaModels } from '../../hooks/useOllamaModels';
import { useSettings } from '../../hooks/useSettings';
import { Cpu, RefreshCw, Settings2, Trash2, Sparkles } from 'lucide-react';
import { SettingsDialog } from '../settings/SettingsDialog';

export const ChatContainer: FC = () => {
  const { messages, isLoading, error, sendMessage, clearHistory } = useChat();
  const { models, loading: modelsLoading, error: modelsError, refresh } = useOllamaModels();
  const { settings, updateSettings } = useSettings();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (models.length === 0) return;
    const ok = models.some((m) => m.name === settings.ollamaModel);
    if (!settings.ollamaModel || !ok) {
      updateSettings({ ollamaModel: models[0].name });
    }
  }, [models, settings.ollamaModel, updateSettings]);

  const selectValue =
    models.length === 0
      ? ''
      : models.some((m) => m.name === settings.ollamaModel)
        ? settings.ollamaModel
        : models[0].name;

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas bg-grid-pattern bg-grid bg-[length:48px_48px]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex h-[100dvh] max-w-5xl flex-col gap-3 p-3 sm:p-5">
        <header className="surface-panel flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/25">
              <Sparkles className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl">
                Ollama Local
              </h1>
              <p className="truncate text-xs text-muted sm:text-sm">Local models, your machine, open source</p>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
            <div className="relative min-w-[10rem] flex-1 sm:min-w-[14rem] sm:flex-none">
              <label htmlFor="model-select" className="sr-only">
                Ollama model
              </label>
              <select
                id="model-select"
                className="select-field h-10 py-0 text-sm"
                value={selectValue}
                onChange={(e) => updateSettings({ ollamaModel: e.target.value })}
                disabled={models.length === 0 || modelsLoading}
              >
                {models.length === 0 && (
                  <option value="">{modelsLoading ? 'Loading models…' : 'No models found'}</option>
                )}
                {models.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="btn-icon h-10 w-10 shrink-0"
              title="Refresh model list"
              onClick={() => void refresh()}
              disabled={modelsLoading}
            >
              <RefreshCw className={`h-4 w-4 ${modelsLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              type="button"
              className="btn-icon h-10 w-10 shrink-0"
              title="Clear conversation"
              onClick={clearHistory}
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="btn-icon h-10 w-10 shrink-0"
              title="Chat preferences"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings2 className="h-4 w-4" />
            </button>
          </div>
        </header>

        {modelsError && (
          <div
            className="surface-panel border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
            role="status"
          >
            <div className="flex items-start gap-2">
              <Cpu className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <div>
                <p className="font-medium">Cannot reach Ollama</p>
                <p className="mt-1 text-xs text-zinc-300">{modelsError}</p>
                <p className="mt-2 text-xs text-muted">
                  Start Ollama (<code className="rounded bg-canvas px-1 py-0.5 font-mono text-[11px]">ollama serve</code>
                  ), pull a model, then refresh.
                </p>
              </div>
            </div>
          </div>
        )}

        <ErrorBoundary>
          <main className="surface-panel flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 sm:px-6 sm:py-6">
              {messages.length === 0 ? (
                <EmptyState hasModels={models.length > 0} modelName={settings.ollamaModel || undefined} />
              ) : (
                <>
                  <MessageList messages={messages} isLoading={isLoading} />
                  <div ref={bottomRef} className="h-px shrink-0" aria-hidden />
                </>
              )}
            </div>

            {error && (
              <div className="border-t border-line/80 bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
                {error}
              </div>
            )}

            <div className="border-t border-line/80 bg-canvas/40 p-3 sm:p-4">
              <ChatInput onSendMessage={sendMessage} isLoading={isLoading} disabled={models.length === 0} />
            </div>
          </main>
        </ErrorBoundary>
      </div>

      <SettingsDialog isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};
