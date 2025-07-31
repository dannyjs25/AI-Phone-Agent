declare module '@/lib/twilio' {
  import { Twilio } from 'twilio';
  import { VoiceResponse } from 'twilio/lib/twiml/voiceResponse';

  const twilioConfig: {
    client: Twilio;
    twiml: {
      VoiceResponse: typeof VoiceResponse;
    };
    phoneNumber: string;
  };

  export { twilioConfig };
}
