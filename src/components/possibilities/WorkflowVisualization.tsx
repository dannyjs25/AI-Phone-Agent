import { useState } from 'react';
import { WorkflowStep } from '@/types/possibilities';
import { Button } from '@/components/ui/button';

interface WorkflowVisualizationProps {
  steps: WorkflowStep[];
  industry: string;
}

export function WorkflowVisualization({ steps, industry }: WorkflowVisualizationProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Get step position based on type
  const getStepPosition = (type: string, index: number) => {
    const positions = {
      trigger: 'left-0',
      process: 'left-1/2',
      action: 'left-full',
    };
    return positions[type as keyof typeof positions] || positions.process;
  };

  return (
    <div className="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden">
      {/* Background Lines */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>

      {/* Steps */}
      <div className="absolute inset-0 flex items-center">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`absolute top-1/2 transform -translate-y-1/2 ${getStepPosition(step.type, index)}`}
          >
            <div
              className={`bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 ${
                activeStep === index
                  ? 'scale-110 z-10'
                  : 'scale-95'
              }`}
              onClick={() => setActiveStep(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <h3 className="ml-3 text-sm font-medium text-gray-900">{step.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{step.type}</span>
                  <span className="text-xs text-gray-500">{step.inputs.length} inputs</span>
                  <span className="text-xs text-gray-500">{step.outputs.length} outputs</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Details Panel */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          showDetails ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">{steps[activeStep]?.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(false)}
            >
              Close
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{steps[activeStep]?.description}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Inputs</h4>
              <ul className="space-y-1">
                {steps[activeStep]?.inputs?.map((input, index) => (
                  <li key={index} className="text-sm text-gray-600">• {input}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Outputs</h4>
              <ul className="space-y-1">
                {steps[activeStep]?.outputs?.map((output, index) => (
                  <li key={index} className="text-sm text-gray-600">• {output}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : prev))}
            disabled={activeStep === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowDetails(true)}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
