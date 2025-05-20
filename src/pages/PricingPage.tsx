import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PricingCard from '../components/pricing/PricingCard';
import { useSubscriptionStore } from '../lib/store';

const PricingPage: React.FC = () => {
  const { plans } = useSubscriptionStore();
  
  return (
    <Layout>
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600">
              Choose the plan that works best for your needs. All plans include our advanced AI humanization technology.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </motion.div>
          
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
            
            <div className="space-y-6 text-left">
              <div className="card">
                <h4 className="text-lg font-medium mb-2">What are character credits?</h4>
                <p className="text-gray-600">
                  Character credits determine how much text you can humanize. Each character in your input text uses one credit from your allocation.
                </p>
              </div>
              
              <div className="card">
                <h4 className="text-lg font-medium mb-2">Can I upgrade or downgrade my plan?</h4>
                <p className="text-gray-600">
                  Yes, you can change your plan at any time. Your new plan will take effect immediately, and we'll prorate any charges.
                </p>
              </div>
              
              <div className="card">
                <h4 className="text-lg font-medium mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600">
                  We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also support PayPal payments.
                </p>
              </div>
              
              <div className="card">
                <h4 className="text-lg font-medium mb-2">Do you offer refunds?</h4>
                <p className="text-gray-600">
                  We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact us within 7 days of purchase for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PricingPage;