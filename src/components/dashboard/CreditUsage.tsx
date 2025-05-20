import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../../lib/hooks';

const CreditUsage: React.FC = () => {
  const { profile } = useProfile();
  
  if (!profile) return null;
  
  // For demo purposes, assume the total credits are based on the plan type
  const getTotalCredits = () => {
    switch (profile.plan_type) {
      case 'free':
        return 1000;
      case 'basic':
        return 10000;
      case 'premium':
        return 30000;
      case 'enterprise':
        return 100000;
      default:
        return 1000;
    }
  };
  
  const totalCredits = getTotalCredits();
  const usedCredits = totalCredits - profile.credits_remaining;
  const percentageUsed = Math.min(100, Math.max(0, (usedCredits / totalCredits) * 100));
  
  const getBarColor = () => {
    if (percentageUsed < 60) return 'bg-success-500';
    if (percentageUsed < 85) return 'bg-warning-500';
    return 'bg-error-500';
  };
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Credit Usage</h3>
      
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {profile.credits_remaining} credits remaining
        </span>
        <span className="text-sm text-gray-600">
          {percentageUsed.toFixed(0)}% used
        </span>
      </div>
      
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentageUsed}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${getBarColor()}`}
        ></motion.div>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <span>Total Credits: {totalCredits}</span>
          <span>Used: {usedCredits}</span>
        </div>
        <div className="mt-1">
          Current Plan: <span className="font-medium capitalize">{profile.plan_type}</span>
        </div>
      </div>
    </div>
  );
};

export default CreditUsage;