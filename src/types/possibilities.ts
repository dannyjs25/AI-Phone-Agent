export interface Possibility {
  id: string;
  title: string;
  industry: 'medical' | 'legal' | 'sales';
  description: string;
  features: string[];
  workflowSteps: WorkflowStep[];
  benefits: string[];
  useCases: string[];
  image: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: string;
  inputs: string[];
  outputs: string[];
  icon: string;
}

export interface IndustryStats {
  id: string;
  name: string;
  icon: string;
  stats: {
    timeSaved: string;
    costReduction: string;
    efficiencyGain: string;
  };
}
