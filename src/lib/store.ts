import { create } from 'zustand';
import { SubscriptionPlan } from './supabase';

interface HumanizerStore {
  inputText: string;
  outputText: string;
  isProcessing: boolean;
  setInputText: (text: string) => void;
  setOutputText: (text: string) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  resetTexts: () => void;
}

export const useHumanizerStore = create<HumanizerStore>((set) => ({
  inputText: '',
  outputText: '',
  isProcessing: false,
  setInputText: (text) => set({ inputText: text }),
  setOutputText: (text) => set({ outputText: text }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  resetTexts: () => set({ inputText: '', outputText: '' }),
}));

interface SubscriptionStore {
  plans: SubscriptionPlan[];
  selectedPlan: SubscriptionPlan | null;
  setSelectedPlan: (plan: SubscriptionPlan | null) => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for trying out the service',
      price: 0,
      credits: 1000,
      features: [
        '1,000 character credits',
        'Basic humanization',
        'Manual saving',
        'Email support',
      ],
    },
    {
      id: 'basic',
      name: 'Basic',
      description: 'Great for occasional users',
      price: 9.99,
      credits: 10000,
      features: [
        '10,000 character credits',
        'Standard humanization',
        'Save up to 10 documents',
        'Priority email support',
      ],
      is_popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Ideal for regular content creators',
      price: 19.99,
      credits: 30000,
      features: [
        '30,000 character credits',
        'Advanced humanization',
        'Save unlimited documents',
        'Priority email support',
        'Style customization',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For teams and businesses',
      price: 49.99,
      credits: 100000,
      features: [
        '100,000 character credits',
        'Premium humanization',
        'Team collaboration',
        'API access',
        'Dedicated support',
        'Custom integration',
      ],
    },
  ],
  selectedPlan: null,
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));