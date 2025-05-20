import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { SubscriptionPlan } from '../../lib/supabase';

interface PricingCardProps {
  plan: SubscriptionPlan;
  isSelected?: boolean;
  onSelect?: (plan: SubscriptionPlan) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  plan, 
  isSelected = false,
  onSelect 
}) => {
  return (
    <div 
      className={`card border-2 transition-all duration-300 h-full flex flex-col ${
        isSelected 
          ? 'border-primary-600 shadow-lg shadow-primary-100' 
          : plan.is_popular 
            ? 'border-secondary-500 shadow-md' 
            : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {plan.is_popular && (
        <div className="bg-secondary-500 text-white text-sm font-semibold py-1 px-4 rounded-t-lg text-center">
          Most Popular
        </div>
      )}
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-gray-600 mb-6">{plan.description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold">${plan.price}</span>
          <span className="text-gray-500">/month</span>
        </div>
        
        <div className="mb-8">
          <div className="font-medium mb-2 text-gray-800">Includes:</div>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto">
          {onSelect ? (
            <Button
              variant={isSelected ? "primary" : "outline"}
              fullWidth
              onClick={() => onSelect(plan)}
            >
              {isSelected ? 'Selected' : 'Select Plan'}
            </Button>
          ) : (
            <Link to="/signup">
              <Button
                variant={plan.is_popular ? "primary" : "outline"}
                fullWidth
              >
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;