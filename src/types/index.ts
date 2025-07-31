import { DefaultSession } from 'next-auth';

export interface TwilioResponse {
  CallSid: string;
  From: string;
  To: string;
}

export interface Session extends DefaultSession {
  user: {
    id: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export interface AuthOptions {
  adapter: {
    User: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  };
  providers: {
    credentials: {
      id: string;
      name: string;
      authorize: (credentials: { email: string; password: string }) => Promise<{
        id: string;
        email: string;
        name: string;
      }>;
    }[];
  };
  secret: string;
  pages: {
    signIn: string;
  };
  callbacks: {
    session: (params: { 
      session: Session; 
      token: {
        sub: string;
        email: string;
        name: string;
        picture: string;
      } 
    }) => Promise<Session>;
  };
}

export interface ElevenLabsResponse {
  stream: ReadableStream<Uint8Array<ArrayBufferLike>>;
  status: 'success' | 'error';
  error?: string;
}
