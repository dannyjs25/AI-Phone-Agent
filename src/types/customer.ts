export interface Customer {
  id: string;
  name: string;
  email: string;
  businessName: string;
  phone: string;
  subscription: Subscription;
  voiceSettings: VoiceSettings;
  createdAt: Date;
  lastUpdated: Date;
}

export interface Subscription {
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: Date;
  endDate: Date;
  features: string[];
}

export interface VoiceSettings {
  userId: string;
  voiceId: string;
  voiceName: string;
  stability: number;
  similarityBoost: number;
  useSpeakerBoost: boolean;
  style: number;
  speed: number;
  customGreeting: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceOptions {
  stability: number;
  similarityBoost: number;
  useSpeakerBoost: boolean;
  style: number;
  speed: number;
}

export interface UsageStats {
  totalCalls: number;
  averageCallDuration: number;
  callsThisMonth: number;
  remainingCalls: number;
  lastCallDate: Date;
  peakUsageTime: string;
}
