import { ChatGenerateResponse, OllamaModelInfo } from '../types';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const apiBase = () => {
  const fromEnv = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  // Dev: hit same origin + /api so Vite proxies to the Express server (see vite.config.ts)
  if (import.meta.env.DEV) return '';
  // Production build opened as file or without env: assume API on same host default port
  return 'http://127.0.0.1:5000';
};

export async function fetchOllamaModels(): Promise<OllamaModelInfo[]> {
  const res = await fetch(`${apiBase()}/api/v1/ollama/models`);
  let data: { models?: OllamaModelInfo[]; error?: string };
  try {
    data = (await res.json()) as { models?: OllamaModelInfo[]; error?: string };
  } catch {
    throw new ApiError(res.status, 'Invalid response from server');
  }

  if (!res.ok) {
    throw new ApiError(res.status, data.error || 'Failed to list models');
  }

  return data.models ?? [];
}

export async function postChatGenerate(
  prompt: string,
  model: string | undefined,
  signal?: AbortSignal
): Promise<ChatGenerateResponse> {
  const res = await fetch(`${apiBase()}/api/v1/chat/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      model: model?.trim() || undefined,
    }),
    signal,
  });

  let data: ChatGenerateResponse & { error?: string };
  try {
    data = (await res.json()) as ChatGenerateResponse & { error?: string };
  } catch {
    throw new ApiError(res.status, 'Invalid response from server');
  }

  if (!res.ok) {
    throw new ApiError(res.status, data.error || 'Chat request failed');
  }

  if (!data.content) {
    throw new Error('Empty response from server');
  }

  return { content: data.content, model: data.model };
}
