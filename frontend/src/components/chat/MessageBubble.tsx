import { FC, memo, useState } from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Message } from '../../types';
import { Markdown } from '../common/Markdown';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: FC<MessageBubbleProps> = memo(({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={twMerge('flex w-full min-w-0', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={twMerge(
          'flex min-w-0 gap-3',
          isUser ? 'max-w-[min(100%,28rem)] flex-row-reverse' : 'w-full max-w-full flex-row sm:max-w-[48rem]'
        )}
      >
        <div
          className={twMerge(
            'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
            isUser ? 'border-accent/35 bg-accent/12 text-accent' : 'border-line bg-elevated text-zinc-400'
          )}
          aria-hidden
        >
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div
            className={twMerge(
              'rounded-2xl border px-4 py-3 shadow-sm',
              isUser
                ? 'border-accent/25 bg-accent/[0.12] text-zinc-100'
                : 'border-line/90 bg-elevated/95 text-zinc-100'
            )}
          >
            {isUser ? (
              <div className="message-plain text-[15px] leading-relaxed text-zinc-100">
                {message.text}
              </div>
            ) : (
              <div className="min-w-0 overflow-x-auto">
                <Markdown content={message.text} />
              </div>
            )}
          </div>

          <div
            className={twMerge(
              'flex items-center gap-2 px-0.5 text-[11px] text-zinc-500',
              isUser ? 'justify-end' : 'justify-between'
            )}
          >
            {!isUser && (
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium text-zinc-400 transition hover:bg-line/40 hover:text-zinc-200"
                title={copied ? 'Copied' : 'Copy'}
              >
                {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
            <time className="tabular-nums" dateTime={message.timestamp.toISOString()}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </time>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

MessageBubble.displayName = 'MessageBubble';
