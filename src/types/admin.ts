export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  plan: 'basic' | 'professional' | 'enterprise';
  subscriptionEndDate: Date;
  createdAt: Date;
  lastLogin: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  callLimit: number;
  supportLevel: string;
  isActive: boolean;
}

export interface SecurityRole {
  id: string;
  name: string;
  permissions: string[];
  description: string;
  users: string[];
}

export interface SystemSetting {
  id: string;
  key: string;
  value: string;
  description: string;
  category: string;
  lastUpdated: Date;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  expiredSubscriptions: number;
  newUsersToday: number;
  callsToday: number;
  averageCallDuration: number;
}
