import { useState, useEffect } from 'react';
import { User } from '@/types/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface UserTableProps {
  users: User[];
  onStatusChange: (userId: string, status: 'active' | 'inactive' | 'suspended') => void;
  onRoleChange: (userId: string, role: 'admin' | 'user') => void;
  onDelete: (userId: string) => void;
}

export function UserTable({ users, onStatusChange, onRoleChange, onDelete }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesStatus = !selectedStatus || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={selectedRole}
          onValueChange={setSelectedRole}
          placeholder="Filter by role"
        >
          <Select.Item value="admin">Admin</Select.Item>
          <Select.Item value="user">User</Select.Item>
        </Select>
        <Select
          value={selectedStatus}
          onValueChange={setSelectedStatus}
          placeholder="Filter by status"
        >
          <Select.Item value="active">Active</Select.Item>
          <Select.Item value="inactive">Inactive</Select.Item>
          <Select.Item value="suspended">Suspended</Select.Item>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.businessName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select
                    value={user.role}
                    onValueChange={(role) => onRoleChange(user.id, role as any)}
                  >
                    <Select.Item value="admin">Admin</Select.Item>
                    <Select.Item value="user">User</Select.Item>
                  </Select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select
                    value={user.status}
                    onValueChange={(status) => onStatusChange(user.id, status as any)}
                  >
                    <Select.Item value="active">Active</Select.Item>
                    <Select.Item value="inactive">Inactive</Select.Item>
                    <Select.Item value="suspended">Suspended</Select.Item>
                  </Select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.plan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
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
