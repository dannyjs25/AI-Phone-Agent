import { useState } from 'react';
import { Possibility, IndustryStats } from '@/types/possibilities';

// Sample possibilities data
const possibilities: Possibility[] = [
  {
    id: 'medical-1',
    title: 'Medical Practice Automation',
    industry: 'medical',
    description: 'Streamline patient communication and appointment scheduling with AI voice integration',
    features: [
      'Automated patient check-ins',
      'Voice-based appointment scheduling',
      'Real-time patient updates',
      'Integration with medical records',
    ],
    workflowSteps: [
      {
        id: '1',
        title: 'Incoming Call',
        description: 'AI voice assistant answers patient calls',
        type: 'trigger',
        inputs: ['Phone Call'],
        outputs: ['Patient Data'],
        icon: 'phone',
      },
      {
        id: '2',
        title: 'Appointment Check',
        description: 'Verifies availability and patient info',
        type: 'process',
        inputs: ['Patient Data'],
        outputs: ['Appointment Status'],
        icon: 'calendar',
      },
      {
        id: '3',
        title: 'Schedule Appointment',
        description: 'Automatically books appointments',
        type: 'action',
        inputs: ['Appointment Status'],
        outputs: ['Confirmation'],
        icon: 'check',
      },
    ],
    benefits: [
      'Reduce patient wait times',
      'Improve appointment accuracy',
      '24/7 availability',
      'Seamless EMR integration',
    ],
    useCases: [
      'Patient appointment scheduling',
      'Medication reminders',
      'Prescription refills',
      'Patient follow-ups',
    ],
    image: '/images/medical-workflow.png',
  },
  {
    id: 'legal-1',
    title: 'Legal Case Management',
    industry: 'legal',
    description: 'Transform legal practice operations with intelligent voice automation',
    features: [
      'Client intake automation',
      'Case status updates',
      'Document management',
      'Court date reminders',
    ],
    workflowSteps: [
      {
        id: '1',
        title: 'Client Inquiry',
        description: 'AI assistant handles initial client calls',
        type: 'trigger',
        inputs: ['Phone Call'],
        outputs: ['Client Info'],
        icon: 'phone',
      },
      {
        id: '2',
        title: 'Case Assessment',
        description: 'Evaluates case eligibility and requirements',
        type: 'process',
        inputs: ['Client Info'],
        outputs: ['Case Status'],
        icon: 'briefcase',
      },
      {
        id: '3',
        title: 'Document Generation',
        description: 'Creates required legal documents',
        type: 'action',
        inputs: ['Case Status'],
        outputs: ['Documents'],
        icon: 'document',
      },
    ],
    benefits: [
      'Faster client onboarding',
      'Reduced administrative workload',
      'Improved case management',
      'Enhanced client communication',
    ],
    useCases: [
      'Client intake process',
      'Case status updates',
      'Document preparation',
      'Court date management',
    ],
    image: '/images/legal-workflow.png',
  },
  {
    id: 'sales-1',
    title: 'Sales Lead Management',
    industry: 'sales',
    description: 'Optimize sales operations with intelligent voice automation',
    features: [
      'Lead qualification',
      'Appointment scheduling',
      'Follow-up automation',
      'CRM integration',
    ],
    workflowSteps: [
      {
        id: '1',
        title: 'Incoming Lead',
        description: 'AI assistant handles initial inquiry',
        type: 'trigger',
        inputs: ['Phone Call'],
        outputs: ['Lead Info'],
        icon: 'phone',
      },
      {
        id: '2',
        title: 'Lead Qualification',
        description: 'Assesses lead potential and needs',
        type: 'process',
        inputs: ['Lead Info'],
        outputs: ['Qualified Lead'],
        icon: 'user-check',
      },
      {
        id: '3',
        title: 'Schedule Meeting',
        description: 'Automatically books sales meetings',
        type: 'action',
        inputs: ['Qualified Lead'],
        outputs: ['Meeting Confirmation'],
        icon: 'calendar',
      },
    ],
    benefits: [
      'Higher lead conversion rates',
      'Reduced response times',
      'Improved follow-up',
      'Better lead tracking',
    ],
    useCases: [
      'Lead qualification',
      'Appointment scheduling',
      'Follow-up automation',
      'Sales pipeline management',
    ],
    image: '/images/sales-workflow.png',
  },
];

const industryStats: IndustryStats[] = [
  {
    id: 'medical',
    name: 'Medical',
    icon: 'hospital',
    stats: {
      timeSaved: '30% time saved on admin tasks',
      costReduction: '20% reduction in staffing costs',
      efficiencyGain: '50% faster patient scheduling',
    },
  },
  {
    id: 'legal',
    name: 'Legal',
    icon: 'gavel',
    stats: {
      timeSaved: '40% faster client onboarding',
      costReduction: '25% reduction in operational costs',
      efficiencyGain: '60% increase in case processing',
    },
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: 'chart-line',
    stats: {
      timeSaved: '35% faster lead response',
      costReduction: '15% reduction in operational costs',
      efficiencyGain: '45% higher lead conversion',
    },
  },
];

export default function PossibilitiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('medical');

  const getIndustryPossibilities = () => {
    return possibilities.filter(p => p.industry === selectedIndustry);
  };

  const getIndustryStats = () => {
    return industryStats.find(s => s.id === selectedIndustry);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Possibilities</h1>
          <div className="flex space-x-4">
            {industryStats.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id as any)}
                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                  selectedIndustry === industry.id
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {industry.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Industry Stats */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            {getIndustryStats() && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-indigo-600">
                    {getIndustryStats().stats.timeSaved}
                  </div>
                  <p className="text-sm text-gray-500">Time Saved</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-green-600">
                    {getIndustryStats().stats.costReduction}
                  </div>
                  <p className="text-sm text-gray-500">Cost Reduction</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-blue-600">
                    {getIndustryStats().stats.efficiencyGain}
                  </div>
                  <p className="text-sm text-gray-500">Efficiency Gain</p>
                </div>
              </div>
            )}
          </div>

          {/* Possibilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getIndustryPossibilities().map((possibility) => (
              <div
                key={possibility.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {possibility.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{possibility.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {possibility.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Workflow */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Workflow
                    </h3>
                    <div className="space-y-4">
                      {possibility.workflowSteps.map((step, index) => (
                        <div
                          key={step.id}
                          className="flex items-center space-x-4 p-3 border rounded-lg"
                        >
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{step.title}</h4>
                            <p className="text-sm text-gray-500">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {possibility.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover how our AI voice agent integration can revolutionize your operations.
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700">
              Get Started
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
