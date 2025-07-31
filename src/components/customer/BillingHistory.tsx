import { useState } from 'react';
import { BillingInfo } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface BillingHistoryProps {
  billingHistory: BillingInfo[];
  currentPlan: string;
  currentUsage: number;
  maxUsage: number;
}

export function BillingHistory({
  billingHistory,
  currentPlan,
  currentUsage,
  maxUsage,
}: BillingHistoryProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  // Filter history based on selected period
  const filteredHistory = billingHistory.filter(bill => {
    const date = new Date(bill.date);
    const now = new Date();
    
    switch (selectedPeriod) {
      case 'month':
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      case 'year':
        return date.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* Current Plan and Usage */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Current Plan</h3>
            <p className="mt-1 text-sm text-gray-500">{currentPlan}</p>
          </div>
          <div className="flex items-center">
            <div className="w-32 h-32 relative">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  d={`M18 2.0845
                    a 15.9155 15.9155 0 0 1 ${currentUsage / maxUsage * 360} 0`}
                  style={{
                    strokeDasharray: `${currentUsage / maxUsage * 100}, 100`,
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-semibold">
                  {Math.round((currentUsage / maxUsage) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Billing History</h3>
          <Select
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
          >
            <Select.Item value="all">All Time</Select.Item>
            <Select.Item value="month">This Month</Select.Item>
            <Select.Item value="year">This Year</Select.Item>
          </Select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.map((bill) => (
                <tr key={bill.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(bill.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${bill.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {bill.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      bill.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Button */}
      <div className="text-center">
        <Button
          className="bg-indigo-600 hover:bg-indigo-700"
          onClick={() => window.location.href = '/customer/upgrade'}
        >
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
}
