import { FC, FormEvent, useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput: FC<ChatInputProps> = ({ onSendMessage, isLoading, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [message]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading || disabled) return;

    const currentMessage = message;
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      await onSendMessage(currentMessage);
    } catch {
      setMessage(currentMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const blocked = isLoading || disabled;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex items-end gap-2" autoComplete="off">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          disabled ? 'Add a model in Ollama to start chatting…' : 'Message your local model…'
        }
        className="field max-h-[200px] min-h-[48px] flex-1 resize-none py-3.5"
        disabled={blocked}
        rows={1}
        autoFocus
        name="message"
      />
      <button
        type="submit"
        disabled={blocked || !message.trim()}
        className="btn-accent mb-0.5 h-11 w-11 shrink-0 rounded-xl p-0"
        title="Send"
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-canvas/30 border-t-canvas" />
        ) : (
          <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
        )}
      </button>
    </form>
  );
};
