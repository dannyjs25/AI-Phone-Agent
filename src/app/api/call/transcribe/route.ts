import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { clientPromise } from '@/lib/mongodb';
import { OpenAI } from 'openai';
import { twilioConfig } from '@/lib/twilio';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { TranscriptionText, CallSid } = await request.json();

    // Analyze the transcription with OpenAI
    const completion = await new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }).chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI phone assistant. Analyze the call transcription and determine if it's a scheduling request. If it is, extract the date and time information. If not, provide a relevant response.",
        },
        {
          role: "user",
          content: `Call transcription: ${TranscriptionText}`,
        },
      ],
    });

    const response = completion.choices[0].message.content;
    
    // Store the analysis in MongoDB
    const client = await clientPromise;
    await client.db().collection('call_transcriptions').insertOne({
      callSid: CallSid,
      transcription: TranscriptionText,
      analysis: response,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json({ error: 'Failed to process transcription' }, { status: 500 });
  }
}
