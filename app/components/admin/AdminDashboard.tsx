import React from 'react';
import { ReactNode } from 'react';

interface AdminDashboardProps {
  children?: ReactNode;
}

export default function AdminDashboard({ children }: AdminDashboardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Appointments</h3>
          <div className="text-3xl font-bold">125</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <div className="text-3xl font-bold">45</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Success Rate</h3>
          <div className="text-3xl font-bold">92%</div>
        </div>
      </div>
      {children}
    </div>
  );
}
