import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Layout, MessageSquare, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../../hooks/useSettings';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsDialog: FC<SettingsDialogProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="settings-overlay"
          role="presentation"
          className="fixed inset-0 z-[200] flex min-h-0 items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close settings"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', damping: 30, stiffness: 360 }}
            className="relative z-10 flex h-[min(90dvh,calc(100dvh-2rem))] w-full max-w-md min-h-0 flex-col overflow-hidden rounded-2xl border border-line/80 bg-panel/95 shadow-panel backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-line/60 px-5 py-4">
              <div className="min-w-0 pr-2">
                <h2 id="settings-title" className="text-lg font-semibold text-white">
                  Preferences
                </h2>
                <p className="mt-1 text-xs text-muted">Applied to your next message.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="btn-icon h-9 w-9 shrink-0 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              <div className="space-y-8 pb-2">
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <MessageSquare className="h-4 w-4 shrink-0 text-accent" />
                    Tone
                  </div>
                  <select
                    value={settings.aiPersonality}
                    onChange={(e) =>
                      updateSettings({
                        aiPersonality: e.target.value as typeof settings.aiPersonality,
                      })
                    }
                    className="select-field"
                  >
                    <option value="default">Balanced</option>
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="concise">Concise</option>
                  </select>
                </section>

                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <Layout className="h-4 w-4 shrink-0 text-accent" />
                    Response shape
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        ['default', 'Default'],
                        ['bullet', 'Bullets'],
                        ['paragraph', 'Paragraphs'],
                        ['stepByStep', 'Steps'],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => updateSettings({ responseFormat: value })}
                        className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                          settings.responseFormat === value
                            ? 'border-accent/50 bg-accent/10 text-white'
                            : 'border-line bg-elevated/50 text-muted hover:border-zinc-600'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <Zap className="h-4 w-4 shrink-0 text-accent" />
                    Code blocks
                  </div>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-elevated/40 px-3 py-3 hover:border-zinc-600">
                    <input
                      type="checkbox"
                      checked={settings.codeBlocks.syntax}
                      onChange={(e) =>
                        updateSettings({
                          codeBlocks: { ...settings.codeBlocks, syntax: e.target.checked },
                        })
                      }
                      className="mt-1 rounded border-line bg-canvas text-accent focus:ring-accent"
                    />
                    <span>
                      <span className="block text-sm text-white">Syntax highlighting</span>
                      <span className="text-xs text-muted">Colorized fenced code</span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-elevated/40 px-3 py-3 hover:border-zinc-600">
                    <input
                      type="checkbox"
                      checked={settings.codeBlocks.lineNumbers}
                      onChange={(e) =>
                        updateSettings({
                          codeBlocks: { ...settings.codeBlocks, lineNumbers: e.target.checked },
                        })
                      }
                      className="mt-1 rounded border-line bg-canvas text-accent focus:ring-accent"
                    />
                    <span>
                      <span className="block text-sm text-white">Line numbers</span>
                      <span className="text-xs text-muted">When supported by highlighter</span>
                    </span>
                  </label>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
