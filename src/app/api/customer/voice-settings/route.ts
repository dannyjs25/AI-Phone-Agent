import { NextResponse, NextRequest } from 'next/server';
import { VoiceSettings } from '../../../../lib/db/models';
import { VoiceOptions } from '../../../../lib/elevenlabs';
import { Session } from '../../../../types/index';
import { VoiceOptions as ElevenLabsVoiceOptions } from '../../../../types/elevenlabs';
import { elevenlabs } from '../../../../lib/elevenlabs';

interface VoiceSettingsData {
  voiceId: string;
  voiceName: string;
  stability: number;
  similarityBoost: number;
  useSpeakerBoost: boolean;
  style: number;
  speed: number;
  customGreeting?: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const voiceSettings = await VoiceSettings.findOne({ userId: session.user.id });
    if (!voiceSettings) {
      // Create default settings if none exist
      const defaultSettings = new VoiceSettings({
        userId: session.user.id,
        voiceId: 'EXAVITQu4vr4xnSDxMaL',
        voiceName: 'Rachel',
        stability: 0.5,
        similarityBoost: 0.75,
        useSpeakerBoost: true,
        style: 0.5,
        speed: 1.0,
        customGreeting: 'Hello! How can I assist you today?',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await defaultSettings.save();
      return NextResponse.json(defaultSettings);
    }
    return NextResponse.json(voiceSettings);
  } catch (error) {
    console.error('Error fetching voice settings:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch voice settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json() as VoiceSettingsData;
    
    // Validate voice settings
    const voiceSettings = await VoiceSettings.findOne({ userId: session.user.id });
    const settingsToUpdate: ElevenLabsVoiceOptions = {
      stability: body.stability || 0.5,
      similarityBoost: body.similarityBoost || 0.75,
      useSpeakerBoost: body.useSpeakerBoost ?? true,
      style: body.style || 0.5,
      speed: body.speed || 1.0,
    };

    // Update voice settings in database
    const updatedSettings = await VoiceSettings.findOneAndUpdate(
      { userId: session.user.id },
      {
        voiceId: body.voiceId,
        voiceName: body.voiceName,
        stability: body.stability || 0.5,
        similarityBoost: body.similarityBoost || 0.75,
        useSpeakerBoost: body.useSpeakerBoost ?? true,
        style: body.style || 0.5,
        speed: body.speed || 1.0,
        customGreeting: body.customGreeting,
        updatedAt: new Date(),
      },
      { new: true, upsert: true }
    );

    // Update voice settings in ElevenLabs
    if (voiceSettings?.voiceId && voiceSettings?.voiceId !== body.voiceId) {
      // If voiceId changed, update settings for new voice
      await elevenlabs.voices.update(body.voiceId, {
        ...settingsToUpdate,
        name: body.voiceName
      });
    } else if (voiceSettings?.voiceId) {
      // If voiceId didn't change, update existing settings
      await elevenlabs.voices.update(voiceSettings.voiceId, {
        ...settingsToUpdate,
        name: body.voiceName
      });
    }

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Error saving voice settings:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save voice settings' },
      { status: 500 }
    );
  }
}

export async function getServerSession(): Promise<Session> {
  // TODO: Implement session management
  return {
    user: {
      id: 'user_123',
      email: 'test@example.com',
      image: null
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  } as Session;
}
