import { generateSpeech } from './elevenlabs';
import { TextToSpeechConvertRequestOutputFormat } from '@elevenlabs/elevenlabs-js/api/resources/textToSpeech/types/TextToSpeechConvertRequestOutputFormat';

describe('ElevenLabs Integration', () => {
  const testVoiceId = 'EXAVITQu4vr4xnSDxMaL'; // Rachel voice
  const testText = 'Hello, this is a test of the text-to-speech system.';

  it('should generate speech with default settings', async () => {
    const result = await generateSpeech({
      text: testText,
      voiceId: testVoiceId,
    });

    expect(result.status).toBe('success');
    expect(result.stream).toBeDefined();
    expect(result.error).toBeUndefined();
  });

  it('should handle errors gracefully', async () => {
    const result = await generateSpeech({
      text: testText,
      voiceId: 'invalid_voice_id', // This should fail
    });

    expect(result.status).toBe('error');
    expect(result.error).toBeDefined();
    expect(result.stream).toBeDefined(); // Still returns a stream even on error
  });

  it('should support different output formats', async () => {
    const formats: TextToSpeechConvertRequestOutputFormat[] = [
      'mp3_44100_32',
      'mp3_22050_32',
      'pcm_44100',
      'pcm_22050',
    ];

    for (const format of formats) {
      const result = await generateSpeech({
        text: testText,
        voiceId: testVoiceId,
        outputFormat: format,
      });

      expect(result.status).toBe('success');
      expect(result.stream).toBeDefined();
      expect(result.error).toBeUndefined();
    }
  });

  it('should support custom model', async () => {
    const result = await generateSpeech({
      text: testText,
      voiceId: testVoiceId,
      modelId: 'eleven_multilingual_v2',
    });

    expect(result.status).toBe('success');
    expect(result.stream).toBeDefined();
    expect(result.error).toBeUndefined();
  });
});
