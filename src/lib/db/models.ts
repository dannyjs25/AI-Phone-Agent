import { Schema, model } from 'mongoose';
import { User as UserType } from '@/types/admin';
import { Subscription as SubscriptionType } from '@/types/admin';
import { VoiceSettings as VoiceSettingsType } from '@/types/customer';

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  businessName: { type: String },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  plan: { type: String, enum: ['basic', 'professional', 'enterprise'], default: 'basic' },
  subscriptionEndDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
});

// Subscription Schema
const subscriptionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, enum: ['basic', 'professional', 'enterprise'], required: true },
  status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Voice Settings Schema
const voiceSettingsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  voiceId: { type: String, required: true },
  voiceName: { type: String, required: true },
  stability: { type: Number, required: true, default: 0.5 },
  similarityBoost: { type: Number, required: true, default: 0.75 },
  useSpeakerBoost: { type: Boolean, required: true, default: true },
  style: { type: Number, required: true, default: 0.5 },
  speed: { type: Number, required: true, default: 1.0 },
  customGreeting: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Type definitions
export type User = UserType & {
  _id: string;
  createdAt: Date;
  lastLogin: Date;
};

export type Subscription = SubscriptionType & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type VoiceSettings = VoiceSettingsType & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

// Model exports
export const User = model<User>('User', userSchema);
export const Subscription = model<Subscription>('Subscription', subscriptionSchema);
export const VoiceSettings = model<VoiceSettings>('VoiceSettings', voiceSettingsSchema);
