import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import HumanizerTool from '../components/humanizer/HumanizerTool';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      
      <section className="py-20 bg-white" id="humanizer">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Try Our AI Humanizer
            </h2>
            <p className="text-xl text-gray-600">
              Enter your AI-generated text below and see the magic happen.
            </p>
          </div>
          
          <HumanizerTool />
        </div>
      </section>
      
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default HomePage;