/// <reference types="next" />
/// <reference types="next/types/global" />

export * from './admin';
export * from './customer';
export * from './elevenlabs';
export * from './twilio';
export * from './admin';
export * from './auth';
export * from './elevenlabs';

// Declare external modules
export {};

declare module '@elevenlabs/elevenlabs-js' {
  export interface VoiceOptions {
    stability: number;
    similarityBoost: number;
    useSpeakerBoost: boolean;
    style: number;
    speed: number;
  }

  export interface Voice {
    voice_id: string;
    name: string;
    settings: VoiceOptions;
  }

  export interface ElevenLabsClient {
    textToSpeech: {
      convert: (voiceId: string, options: {
        text: string;
        modelId?: string;
        outputFormat?: TextToSpeechConvertRequestOutputFormat;
        applyTextNormalization?: 'auto' | 'on' | 'off';
      }) => Promise<ReadableStream<Uint8Array>>;
    };
    voices: {
      search: () => Promise<{ voices: Voice[] }>;
      get: (voiceId: string) => Promise<Voice>;
      settings: {
        update: (voiceId: string, options: VoiceOptions) => Promise<void>;
      };
    };
  }
  export const elevenlabs: ElevenLabsClient;
}

declare module '@/lib/db/models' {
  export interface User {
    _id: string;
    email: string;
    name?: string;
    businessName?: string;
    role?: string;
    plan?: string;
  }
  export interface VoiceSettings {
    voiceId: string;
    settings: VoiceOptions;
    createdAt: Date;
    updatedAt: Date;
  }
}

declare module '@/lib/auth' {
  export interface UserSession {
    user: {
      id: string;
      email: string;
      name?: string;
      businessName?: string;
      role?: string;
      plan?: string;
    };
    expires: string;
  }
  export function getServerSession(): Promise<UserSession | null>;
}
