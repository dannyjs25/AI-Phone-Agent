import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Portal - AI Phone Agent',
  description: 'Manage your AI phone assistant account and settings',
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
