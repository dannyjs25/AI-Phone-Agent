import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - AI Phone Agent',
  description: 'Manage system settings and user accounts',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
