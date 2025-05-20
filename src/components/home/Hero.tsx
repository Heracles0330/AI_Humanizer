import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Sparkles, Shield, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="text-gradient">Humanize AI Text</span> Instantly
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Transform AI-generated content into natural-sounding human text that passes AI detection tools with our advanced humanizer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button variant="primary" size="lg" leftIcon={<Sparkles className="h-5 w-5" />}>
                  Get Started Free
                </Button>
              </Link>
              <Link to="#how-it-works">
                <Button variant="outline" size="lg">
                  How It Works
                </Button>
              </Link>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-primary-600 mr-2" />
                <span className="text-gray-700">Undetectable by AI</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-6 w-6 text-primary-600 mr-2" />
                <span className="text-gray-700">Fast Processing</span>
              </div>
              <div className="flex items-center">
                <svg 
                  className="h-6 w-6 text-primary-600 mr-2" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span className="text-gray-700">100% Private</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl shadow-2xl overflow-hidden"
          >
            <img
              src="https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="AI text humanizer in action"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-primary-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary-100 rounded-full opacity-20 blur-3xl -z-10"></div>
    </section>
  );
};

export default Hero;