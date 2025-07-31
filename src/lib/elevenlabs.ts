import { VoiceOptions, TextToSpeechRequest, TextToSpeechOptions, SpeechResult, VoiceListResult } from '../types/elevenlabs';
import { ReadableStream } from 'stream/web';
import { Session } from '../types/index';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

if (!process.env.ELEVENLABS_API_KEY) {
  throw new Error('ELEVENLABS_API_KEY environment variable is required');
}

const elevenlabsClient = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export { VoiceOptions, elevenlabsClient as elevenlabs };

export async function getServerSession(): Promise<Session> {
  return {
    user: {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      image: null
    },
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  };
}

export async function validateVoiceId(voiceId: string): Promise<boolean> {
  try {
    const voice = await elevenlabsClient.voices.get(voiceId);
    if (!voice) {
      throw new Error('Voice not found');
    }
    return true;
  } catch (error) {
    console.error('Voice validation error:', error);
    return false;
  }
}

export async function generateSpeech(options: TextToSpeechOptions): Promise<SpeechResult> {
  try {
    // Validate voice ID
    const isValidVoice = await validateVoiceId(options.voiceId);
    if (!isValidVoice) {
      throw new Error(`Invalid voice ID: ${options.voiceId}`);
    }

    // Validate text length
    if (options.text.length > 10000) {
      throw new Error('Text too long. Maximum length is 10,000 characters.');
    }

    // Get current voice settings
    const voiceSettings = await getVoiceSettings(options.voiceId);

    const response = await elevenlabsClient.textToSpeech.convert(options.voiceId, {
      text: options.text,
      modelId: options.modelId || "eleven_multilingual_v2",
      outputFormat: "mp3_44100_32",
      applyTextNormalization: options.applyTextNormalization || "auto",
      stability: voiceSettings.stability,
      similarityBoost: voiceSettings.similarityBoost,
      useSpeakerBoost: voiceSettings.useSpeakerBoost,
      style: voiceSettings.style,
      speed: voiceSettings.speed
    } as TextToSpeechRequest);

    // Create a wrapper stream to handle the ArrayBuffer conversion
    const stream = new ReadableStream<Uint8Array<ArrayBufferLike>>({
      async start(controller) {
        try {
          const reader = response.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const uint8Array = new Uint8Array(value);
            controller.enqueue(uint8Array);
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return {
      stream,
      status: 'success'
    };
  } catch (error) {
    console.error('Speech generation error:', error);
    return {
      stream: new ReadableStream<Uint8Array<ArrayBufferLike>>({
        start(controller) {
          controller.close();
        }
      }),
      status: 'error',
      error: error.message
    };
  }
}

export async function listVoices(): Promise<VoiceListResult> {
  try {
    const voices = await elevenlabsClient.voices.search();
    return {
      voices: voices.voices.map(voice => ({
        voiceId: voice.voiceId,
        name: voice.name || '',
        category: voice.category || '',
        description: voice.description || '',
        previewUrl: voice.previewUrl || '',
        samples: voice.samples?.map(sample => (sample as any).url || '') || [''],
        settings: {
          stability: voice.settings?.stability ?? 0.5,
          similarityBoost: voice.settings?.similarityBoost ?? 0.75,
          useSpeakerBoost: voice.settings?.useSpeakerBoost ?? true,
          style: voice.settings?.style ?? 0.5,
          speed: voice.settings?.speed ?? 1.0
        }
      }))
    };
  } catch (error) {
    console.error('Error listing voices:', error);
    throw error;
  }
}

export async function updateVoiceSettings(voiceId: string, options: VoiceOptions): Promise<void> {
  try {
    // Validate voice ID before updating
    const isValidVoice = await validateVoiceId(voiceId);
    if (!isValidVoice) {
      throw new Error(`Invalid voice ID: ${voiceId}`);
    }

    // Validate settings values
    if (options.stability < 0 || options.stability > 1) {
      throw new Error('Stability must be between 0 and 1');
    }
    if (options.similarityBoost < 0 || options.similarityBoost > 1) {
      throw new Error('Similarity boost must be between 0 and 1');
    }
    if (options.style < 0 || options.style > 1) {
      throw new Error('Style must be between 0 and 1');
    }
    if (options.speed < 0.25 || options.speed > 4) {
      throw new Error('Speed must be between 0.25 and 4');
    }

    const typedOptions: VoiceOptions = {
      stability: Number(options.stability),
      similarityBoost: Number(options.similarityBoost),
      useSpeakerBoost: Boolean(options.useSpeakerBoost),
      style: Number(options.style),
      speed: Number(options.speed)
    };

    await elevenlabsClient.voices.settings.update(voiceId, typedOptions);
  } catch (error) {
    console.error('Voice settings update error:', error);
    throw new Error(`Failed to update voice settings: ${error.message}`);
  }
}

export async function getVoiceSettings(voiceId: string): Promise<VoiceOptions> {
  try {
    // Validate voice ID
    const isValidVoice = await validateVoiceId(voiceId);
    if (!isValidVoice) {
      throw new Error(`Invalid voice ID: ${voiceId}`);
    }

    const voice = await elevenlabsClient.voices.get(voiceId);
    if (!voice.settings) {
      // Create default settings and save them
      const defaultSettings: VoiceOptions = {
        stability: 0.5,
        similarityBoost: 0.75,
        useSpeakerBoost: true,
        style: 0.5,
        speed: 1.0
      };
      await elevenlabsClient.voices.settings.update(voiceId, defaultSettings);
      return defaultSettings;
    }
    return voice.settings as VoiceOptions;
  } catch (error) {
    console.error('Voice settings retrieval error:', error);
    throw new Error(`Failed to get voice settings: ${error.message}`);
  }
}
