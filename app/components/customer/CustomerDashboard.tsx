import React from 'react';
import { ReactNode } from 'react';

interface CustomerDashboardProps {
  children?: ReactNode;
}

export default function CustomerDashboard({ children }: CustomerDashboardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Next Appointment</h3>
          <div className="text-lg">Tomorrow, 2:00 PM</div>
          <div className="text-sm text-gray-600 mt-1">With Dr. Smith</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Appointment History</h3>
          <div className="text-sm text-gray-600">5 appointments this month</div>
        </div>
      </div>
      {children}
    </div>
  );
}
