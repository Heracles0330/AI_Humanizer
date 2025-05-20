import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make Your AI Text Sound Human?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of users who are already using HumanizeAI to transform their AI-generated content.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <Button 
                variant="secondary" 
                size="lg"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                View Pricing
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-white/70 text-sm">
            No credit card required. Start with 1,000 free character credits.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;