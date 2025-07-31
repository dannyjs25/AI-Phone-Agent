import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Possibilities - AI Voice Agent Integration',
  description: 'Explore the powerful combinations of AI voice technology with n8n workflows for medical practices, legal firms, and sales organizations.',
  keywords: 'AI voice integration, n8n workflows, medical automation, legal automation, sales automation',
};

export default function PossibilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
