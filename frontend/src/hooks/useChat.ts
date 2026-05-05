import { useCallback, useRef, useState } from 'react';
import { Message, ChatState } from '../types';
import { useSettings } from './useSettings';
import { formatPrompt, cleanResponse } from './promptEngineering';
import { postChatGenerate } from '../utils/api';

const generateMessageId = () => `${Date.now()}-${Math.random().toString(36).substring(7)}`;

const MAX_CONTEXT_MESSAGES = 10;

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
};

export const useChat = () => {
  const { settings } = useSettings();
  const [state, setState] = useState<ChatState>(initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  const addMessage = useCallback((text: string, sender: 'user' | 'bot') => {
    setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: generateMessageId(),
          text,
          sender,
          timestamp: new Date(),
        },
      ],
    }));
  }, []);

  const buildContextPrompt = (newPrompt: string, messages: Message[]) => {
    const contextMessages = messages.slice(-MAX_CONTEXT_MESSAGES);
    const context = contextMessages.map((msg) => msg.text).join('\n\n');
    return context ? `${context}\n\n${newPrompt}` : newPrompt;
  };

  const sendMessage = useCallback(
    async (prompt: string) => {
      if (!prompt.trim() || state.isLoading) return;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        addMessage(prompt, 'user');

        const contextPrompt = buildContextPrompt(prompt, state.messages);
        const engineeredPrompt = formatPrompt(contextPrompt, settings);

        const { content } = await postChatGenerate(
          engineeredPrompt,
          settings.ollamaModel || undefined,
          signal
        );

        if (signal.aborted) return;

        const cleaned = cleanResponse(content);
        addMessage(cleaned, 'bot');
      } catch (error) {
        if (signal.aborted) {
          return;
        }
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.error('Chat error:', error);
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Failed to send message',
        }));
      } finally {
        if (abortControllerRef.current?.signal === signal) {
          abortControllerRef.current = null;
        }
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [addMessage, settings, state.isLoading, state.messages]
  );

  const clearHistory = useCallback(() => {
    setState(initialState);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearHistory,
  };
};
