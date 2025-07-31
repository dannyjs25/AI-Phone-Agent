import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Customer, UsageStats } from '@/types/customer';

export default function CustomerDashboard() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerData();
    fetchUsageStats();
  }, []);

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/customer/profile');
      if (!response.ok) throw new Error('Failed to fetch customer data');
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsageStats = async () => {
    try {
      const response = await fetch('/api/customer/usage');
      if (!response.ok) throw new Error('Failed to fetch usage stats');
      const data = await response.json();
      setUsageStats(data);
    } catch (error) {
      console.error('Error fetching usage stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Customer Portal</h1>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {customer?.subscription.plan?.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/customer/profile"
              className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Profile
            </Link>
            <Link
              href="/customer/billing"
              className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Billing
            </Link>
            <Link
              href="/customer/voice-settings"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Voice Settings
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Welcome, {customer?.name}!
              </h2>
              <p className="text-gray-600 mb-4">
                Your AI phone assistant is ready to help manage your calls.
              </p>
              <div className="flex space-x-4">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  View Call History
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
                  Test Voice Assistant
                </button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Calls This Month</h3>
              <p className="text-3xl font-semibold text-gray-900">
                {loading ? '...' : usageStats?.callsThisMonth || 0}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Remaining Calls</h3>
              <p className="text-3xl font-semibold text-gray-900">
                {loading ? '...' : usageStats?.remainingCalls || 0}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Average Duration</h3>
              <p className="text-3xl font-semibold text-gray-900">
                {loading ? '...' : usageStats?.averageCallDuration || 0} mins
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Peak Time</h3>
              <p className="text-3xl font-semibold text-gray-900">
                {loading ? '...' : usageStats?.peakUsageTime || 'N/A'}
              </p>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Subscription Status</h2>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    Current Plan: {customer?.subscription.plan?.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {customer?.subscription.status?.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Next Bill: {customer?.subscription.nextBillDate?.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex-none">
                  <Link
                    href="/customer/billing"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Manage Subscription
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/customer/voice-settings"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Voice Settings</h4>
                  <p className="text-sm text-gray-500">Customize your AI voice</p>
                </div>
              </div>
            </Link>

            <Link
              href="/customer/call-history"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Call History</h4>
                  <p className="text-sm text-gray-500">View past calls</p>
                </div>
              </div>
            </Link>

            <Link
              href="/customer/support"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Support</h4>
                  <p className="text-sm text-gray-500">Get help</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
