import { FC } from 'react';
import { MessageSquare, Terminal, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  hasModels: boolean;
  modelName?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({ hasModels, modelName }) => {
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center px-4 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-md"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
          <Terminal className="h-8 w-8 text-accent" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Start a conversation</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {hasModels && modelName ? (
            <>
              You are using <span className="font-mono text-accent-glow">{modelName}</span>. Ask
              anything — responses stay on your machine.
            </>
          ) : (
            <>
              Pull a model with{' '}
              <code className="rounded-md bg-elevated px-1.5 py-0.5 font-mono text-xs text-zinc-200">
                ollama pull llama3.2
              </code>{' '}
              then refresh the model list in the header.
            </>
          )}
        </p>
      </motion.div>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="mt-12 grid w-full max-w-lg grid-cols-1 gap-3 text-left sm:grid-cols-3"
      >
        <Hint icon={MessageSquare} title="Private" body="No cloud API required for chat." />
        <Hint icon={Zap} title="Pick any model" body="Use whatever you have pulled in Ollama." />
        <Hint icon={Terminal} title="Open source" body="Fork, theme, and ship your own build." />
      </motion.ul>
    </div>
  );
};

const Hint: FC<{ icon: typeof MessageSquare; title: string; body: string }> = ({
  icon: Icon,
  title,
  body,
}) => (
  <li className="rounded-xl border border-line/80 bg-elevated/50 px-4 py-3">
    <div className="flex items-center gap-2 text-sm font-medium text-white">
      <Icon className="h-4 w-4 text-accent" />
      {title}
    </div>
    <p className="mt-1 text-xs leading-snug text-muted">{body}</p>
  </li>
);
