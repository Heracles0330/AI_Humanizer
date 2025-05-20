import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { useAuth } from '../lib/hooks';
import { useSubscriptionStore } from '../lib/store';
import PricingCard from '../components/pricing/PricingCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { CreditCard, Calendar, Lock, Check } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const { user, loading } = useAuth();
  const { plans, selectedPlan, setSelectedPlan } = useSubscriptionStore();
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!selectedPlan && plans.length > 0) {
    // Auto-select the Basic plan or first paid plan
    const basicPlan = plans.find(plan => plan.id === 'basic') || plans.find(plan => plan.price > 0) || plans[0];
    setSelectedPlan(basicPlan);
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/dashboard');
    }, 2000);
  };
  
  return (
    <Layout>
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl font-bold mb-10 text-center">Payment</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="card">
                  <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
                  
                  <form onSubmit={handlePayment} className="space-y-6">
                    <div>
                      <Input
                        label="Card Number"
                        name="number"
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={handleInputChange}
                        required
                        leftIcon={<CreditCard className="h-5 w-5 text-gray-400" />}
                      />
                    </div>
                    
                    <div>
                      <Input
                        label="Cardholder Name"
                        name="name"
                        id="card-name"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          label="Expiry Date"
                          name="expiry"
                          id="card-expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={handleInputChange}
                          required
                          leftIcon={<Calendar className="h-5 w-5 text-gray-400" />}
                        />
                      </div>
                      
                      <div>
                        <Input
                          label="CVC"
                          name="cvc"
                          id="card-cvc"
                          placeholder="123"
                          value={cardDetails.cvc}
                          onChange={handleInputChange}
                          required
                          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        type="submit"
                        fullWidth
                        isLoading={isProcessing}
                        disabled={isProcessing}
                      >
                        {isProcessing 
                          ? 'Processing...'
                          : `Pay $${selectedPlan?.price.toFixed(2)}`
                        }
                      </Button>
                    </div>
                    
                    <div className="text-center text-sm text-gray-500 flex items-center justify-center mt-4">
                      <Lock className="h-4 w-4 mr-2" />
                      <span>Your payment info is secured with 256-bit encryption</span>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="md:col-span-1">
                {selectedPlan && (
                  <div className="card">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                    
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <div className="font-medium">{selectedPlan.name} Plan</div>
                      <div className="text-sm text-gray-600">{selectedPlan.description}</div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {selectedPlan.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>${selectedPlan.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>${selectedPlan.price.toFixed(2)}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        Billed monthly. Cancel anytime.
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Change Plan</h3>
                  
                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer ${
                          selectedPlan?.id === plan.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedPlan(plan)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{plan.name}</div>
                            <div className="text-sm text-gray-600">${plan.price}/mo</div>
                          </div>
                          <div className={`h-4 w-4 rounded-full ${
                            selectedPlan?.id === plan.id
                              ? 'bg-primary-600'
                              : 'border-2 border-gray-300'
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentPage;