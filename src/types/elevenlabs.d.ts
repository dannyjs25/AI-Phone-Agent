export type TextToSpeechConvertRequestOutputFormat = 'mp3_44100_32' | 'mp3_22050_32' | 'pcm_44100' | 'pcm_22050';

export interface Voice {
  voiceId: string;
  name: string;
  category: string;
  description: string;
  previewUrl: string;
  samples: VoiceSample[];
  settings: VoiceOptions;
  [key: string]: any;
}

export interface VoiceSample {
  url: string;
  text?: string;
  [key: string]: any;
  [key: number]: any;
  [key: symbol]: any;
  [key: bigint]: any;
  [key: undefined]: any;
  [key: null]: any;
  [key: unknown]: any;
}

export interface VoiceOptions {
  stability: number;
  similarityBoost: number;
  useSpeakerBoost: boolean;
  style: number;
  speed: number;
}

export interface VoiceSettings {
  stability: number;
  similarityBoost: number;
  useSpeakerBoost: boolean;
  style: number;
  speed: number;
}

export interface TextToSpeechRequest {
  text: string;
  modelId?: string;
  outputFormat?: TextToSpeechConvertRequestOutputFormat;
  applyTextNormalization?: 'auto' | 'on' | 'off';
  stability?: number;
  similarityBoost?: number;
  useSpeakerBoost?: boolean;
  style?: number;
  speed?: number;
}

export interface ElevenLabsOptions extends TextToSpeechRequest {
  voiceId: string;
}

export interface ElevenLabsResponse {
  stream: ReadableStream<Uint8Array>;
  status: 'success' | 'error';
  error?: string;
}

export interface VAPIVoiceAgent {
  agentId: string;
  name: string;
  description: string;
  voiceId: string;
  settings: VoiceOptions;
  createdAt: string;
  updatedAt: string;
}

export interface VAPIAgentOptions {
  name: string;
  description?: string;
  voiceId: string;
  settings?: VoiceOptions;
}

export interface ElevenLabsClient {
  textToSpeech: {
    convert: (voiceId: string, options: TextToSpeechRequest) => Promise<ReadableStream<Uint8Array>>;
  };
  voices: {
    search: () => Promise<{ voices: Voice[] }>;
    get: (voiceId: string) => Promise<Voice>;
    update: (voiceId: string, options: VoiceOptions) => Promise<void>;
  };
  voiceAgents: {
    list: () => Promise<{ agents: VAPIVoiceAgent[] }>;
    create: (options: VAPIAgentOptions) => Promise<VAPIVoiceAgent>;
    get: (agentId: string) => Promise<VAPIVoiceAgent>;
    update: (agentId: string, options: VAPIAgentOptions) => Promise<VAPIVoiceAgent>;
    delete: (agentId: string) => Promise<void>;
  };
}

export interface VoiceListResult {
  voices: Voice[];
}

export type TextToSpeechOptions = {
  text: string;
  voiceId: string;
  modelId?: string;
  outputFormat?: TextToSpeechConvertRequestOutputFormat;
  applyTextNormalization?: 'auto' | 'on' | 'off';
};

export type SpeechResult = {
  stream: import('stream/web').ReadableStream<Uint8Array<ArrayBufferLike>>;
  status: 'success' | 'error';
  error?: string;
};

export type ElevenLabsVoiceOptions = VoiceOptions;

export const elevenlabs: ElevenLabsClient;
export const generateSpeech: (options: TextToSpeechOptions) => Promise<SpeechResult>;
export const listVoices: () => Promise<VoiceListResult>;
export const updateVoiceSettings: (voiceId: string, options: VoiceOptions) => Promise<void>;
export const getVoiceSettings: (voiceId: string) => Promise<VoiceOptions>;
