import React from 'react';
import { ReactNode } from 'react';

interface PossibilitiesProps {
  title?: string;
  description?: string;
  items?: Array<{
    icon: ReactNode;
    title: string;
    description: string;
  }>;
}

export default function Possibilities({
  title = 'What is Possible',
  description = 'Explore the endless possibilities of our AI Voice Agent',
  items = [
    {
      icon: <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">📞</div>,
      title: 'Automated Customer Service',
      description: 'Handle customer inquiries 24/7 with our intelligent voice agent'
    },
    {
      icon: <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">📅</div>,
      title: 'Appointment Scheduling',
      description: 'Automatically schedule and manage appointments with natural conversation'
    },
    {
      icon: <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">📊</div>,
      title: 'Analytics & Insights',
      description: 'Get detailed insights into customer interactions and performance'
    }
  ]
}: PossibilitiesProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
