import { Voice } from './elevenlabs';

export interface AssistantOptions {
  name: string;
  description?: string;
  systemPrompt?: string;
  firstMessage?: string | string; // Can be text or URL to audio file
  firstMessageMode?: 'assistant-speaks-first' | 'assistant-waits-for-user' | 'assistant-speaks-first-with-model-generated-message';
  maxCallDuration?: number; // in seconds, default 600 (10 minutes)
  voice?: Voice;
  voiceProvider?: 'elevenlabs';
  model?: {
    provider: 'openai' | 'anthropic' | 'google';
    id: string;
    temperature?: number;
    maxTokens?: number;
  };
  tools?: {
    voicemailDetection?: boolean;
    noiseReduction?: {
      smartDenoising?: boolean;
      fourierDenoising?: boolean;
    };
  };
  server?: {
    url?: string;
    events?: ('conversation-update' | 'function-call' | 'hang' | 'speech-update' | 'status-update' | 'tool-calls' | 'transfer-update' | 'transcript' | 'user-interrupted' | 'voice-input' | 'workflow.node.started')[];
  };
  client?: {
    events?: ('conversation-update' | 'function-call' | 'hang' | 'model-output' | 'speech-update' | 'status-update' | 'transfer-update' | 'transcript' | 'tool-calls' | 'user-interrupted' | 'voice-input' | 'workflow.node.started')[];
  };
}

export interface Assistant {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'error';
  options: AssistantOptions;
}

export interface VapiClient {
  createAssistant(options: AssistantOptions): Promise<Assistant>;
  getAssistant(id: string): Promise<Assistant>;
  updateAssistant(id: string, options: Partial<AssistantOptions>): Promise<Assistant>;
  deleteAssistant(id: string): Promise<void>;
  listAssistants(): Promise<Assistant[]>;
}
