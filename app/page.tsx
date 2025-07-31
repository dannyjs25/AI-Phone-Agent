import React from 'react';
import { Suspense, ReactNode } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import { Metadata } from 'next';

// Add metadata for AI Voice Agent
export const metadata: Metadata = {
  title: 'AI Voice Agent - Transform Text into Natural Speech',
  description: 'Transform text into natural-sounding speech using advanced AI voice synthesis technology.',
  keywords: 'AI voice synthesis, text to speech, AI voice agent, speech synthesis, voice processing',
};

export default function Home(): JSX.Element {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
        <Header />
      </Suspense>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-12">
            <Features />
            <Pricing />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
