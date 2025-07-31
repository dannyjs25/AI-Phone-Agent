import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - AI Phone Agent',
  description: 'Manage your AI phone assistant settings and appointments',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
