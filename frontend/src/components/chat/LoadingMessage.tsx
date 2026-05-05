import { FC } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoadingMessage: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full min-w-0 justify-start"
    >
      <div className="flex w-full max-w-full min-w-0 gap-3 sm:max-w-[48rem]">
        <div
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-elevated"
          aria-hidden
        >
          <Loader2 className="h-4 w-4 animate-spin text-accent" />
        </div>
        <div className="min-w-0 flex-1 rounded-2xl border border-line/90 bg-elevated/80 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 animate-bounce rounded-full bg-accent/80 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-accent/80 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-accent/80" />
          </div>
          <p className="mt-2 text-xs text-zinc-500">Generating response…</p>
        </div>
      </div>
    </motion.div>
  );
};
