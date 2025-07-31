declare module '@elevenlabs/elevenlabs-js' {
  export interface ElevenLabsClientOptions {
    apiKey: string;
  }

  export class ElevenLabsClient {
    constructor(options: ElevenLabsClientOptions);

    textToSpeech: {
      convert: (
        voiceId: string,
        options: {
          text: string;
          modelId?: string;
          stability?: number;
          similarityBoost?: number;
          useSpeakerBoost?: boolean;
          style?: number;
          speed?: number;
          outputFormat?: 'mp3_44100_32' | 'mp3_22050_32' | 'pcm_44100' | 'pcm_22050';
          applyTextNormalization?: 'auto' | 'on' | 'off';
        }
      ) => Promise<ReadableStream<Uint8Array>>;
    };

    voices: {
      search: () => Promise<{ voices: Voice[] }>;
      get: (voiceId: string) => Promise<Voice>;
      settings: {
        update: (voiceId: string, options: VoiceOptions) => Promise<void>;
      };
    };
  }
}
