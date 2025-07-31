import { useState } from 'react';
import { Subscription, PricingPlan } from '@/types/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface SubscriptionManagementProps {
  subscriptions: Subscription[];
  pricingPlans: PricingPlan[];
  onPlanUpdate: (subscriptionId: string, planId: string) => void;
  onStatusUpdate: (subscriptionId: string, status: 'active' | 'inactive' | 'cancelled') => void;
}

export function SubscriptionManagement({
  subscriptions,
  pricingPlans,
  onPlanUpdate,
  onStatusUpdate,
}: SubscriptionManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubscriptions = subscriptions.filter(sub => {
    return sub.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           sub.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           sub.plan.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubscriptions.map((sub) => (
              <tr key={sub.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {sub.user.name} ({sub.user.email})
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select
                    value={sub.plan.id}
                    onValueChange={(planId) => onPlanUpdate(sub.id, planId)}
                  >
                    {pricingPlans.map((plan) => (
                      <Select.Item key={plan.id} value={plan.id}>
                        {plan.name} - ${plan.price}/month
                      </Select.Item>
                    ))}
                  </Select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select
                    value={sub.status}
                    onValueChange={(status) => onStatusUpdate(sub.id, status as any)}
                  >
                    <Select.Item value="active">Active</Select.Item>
                    <Select.Item value="inactive">Inactive</Select.Item>
                    <Select.Item value="cancelled">Cancelled</Select.Item>
                  </Select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(sub.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/admin/subscriptions/${sub.id}`}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
