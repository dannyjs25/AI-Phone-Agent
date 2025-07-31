import { Session } from 'next-auth';

export interface UserSession {
  user: {
    id: string;
    email: string;
    name?: string;
    businessName?: string;
    role?: string;
    plan?: string;
  };
}

export async function getServerSession(): Promise<UserSession | null> {
  // TODO: Implement real authentication
  // For now, return a mock session
  return {
    user: {
      id: 'user_123',
      email: 'test@example.com',
      name: 'Test User',
      businessName: 'Test Business',
      role: 'user',
      plan: 'basic'
    }
  };
}
