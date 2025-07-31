import { NextResponse } from 'next/server';
import { twilioConfig } from '@/lib/twilio';
import { getServerSession } from 'next-auth';
import { elevenlabs, generateSpeech } from '@/lib/elevenlabs';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const twiml = new twilioConfig.twiml.VoiceResponse();
    
    // Get call parameters from request
    const { CallSid, From, To } = await request.json();

    // Generate natural greeting with ElevenLabs
    const response = await generateSpeech({
      text: 'Thank you for calling. I can help you schedule an appointment or answer any questions. How may I assist you today?',
      voiceId: 'EXAVITQu4vr4xnSDxMaL' // Rachel voice
    });

    if (response.status === 'error') {
      console.error('ElevenLabs error:', response.error);
      return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
    }

    // Create a temporary file to store the audio
    const fs = require('fs/promises');
    const path = require('path');
    const tempFilePath = path.join(process.cwd(), 'temp', 'greeting.mp3');
    
    // Write the stream to file using Web API
    const reader = response.stream.getReader();
    const writable = fs.createWriteStream(tempFilePath);
    
    await new Promise<void>((resolve, reject) => {
      const writeChunk = async () => {
        try {
          const { done, value } = await reader.read();
          if (done) {
            writable.end();
            resolve();
            return;
          }
          writable.write(value);
          await writeChunk();
        } catch (err) {
          reject(err);
        }
      };
      writeChunk();
    });

    // Play the greeting using TwiML
    twiml.play({
      url: `${process.env.NEXTAUTH_URL}/api/audio/${tempFilePath}`,
    });

    // Record the call for analysis
    twiml.record({
      transcribe: true,
      transcribeCallback: `${process.env.NEXTAUTH_URL}/api/call/transcribe`,
      recordingStatusCallback: `${process.env.NEXTAUTH_URL}/api/call/recording`,
    });

    // Wait for response
    twiml.pause({ length: 2 });

    return NextResponse.json({ twiml: twiml.toString() });
  } catch (error) {
    console.error('Call handling error:', error);
    return NextResponse.json({ error: 'Failed to process call' }, { status: 500 });
  }
}
