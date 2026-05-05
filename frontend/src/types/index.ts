export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface OllamaModelInfo {
  name: string;
  size?: number;
  digest?: string;
}

export interface ChatGenerateResponse {
  content: string;
  model: string;
}

export interface Settings {
  aiPersonality: 'default' | 'professional' | 'friendly' | 'concise';
  responseFormat: 'default' | 'bullet' | 'paragraph' | 'stepByStep';
  codeBlocks: {
    syntax: boolean;
    lineNumbers: boolean;
  };
  /** Selected Ollama model tag, e.g. llama3.2:latest */
  ollamaModel: string;
}
