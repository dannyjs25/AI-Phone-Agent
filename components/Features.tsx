import React from 'react';

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-base-100 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Advanced Voice Synthesis</h3>
          <p className="text-base-content/70">
            Generate natural-sounding speech with ElevenLabs AI technology
          </p>
        </div>
        <div className="text-center p-6 bg-base-100 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Real-time Processing</h3>
          <p className="text-base-content/70">
            Instant text-to-speech conversion with adjustable parameters
          </p>
        </div>
        <div className="text-center p-6 bg-base-100 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Enterprise Security</h3>
          <p className="text-base-content/70">
            Secure authentication and data protection
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
