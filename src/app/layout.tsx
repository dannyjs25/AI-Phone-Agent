import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import TopLoader from 'nextjs-toploader';
import CallNowButton from '@/components/CallNowButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Phone Agent Service',
  description: 'Transform your phone chaos into seamless client management with our AI phone agent service.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopLoader color="#6366F1" height={3} shadow={true} speed={1000} />
        {children}
        <CallNowButton position="bottom-right" />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
