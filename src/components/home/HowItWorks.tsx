import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Paste Your AI Text',
    description: 'Simply paste your AI-generated content into our humanizer tool.',
    color: 'bg-primary-500',
  },
  {
    number: '02',
    title: 'Click Humanize',
    description: 'Our advanced algorithm transforms your text into natural human writing.',
    color: 'bg-secondary-500',
  },
  {
    number: '03',
    title: 'Get Human-Like Results',
    description: 'Copy your humanized text that will pass AI detection tools.',
    color: 'bg-accent-500',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50" id="how-it-works">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Our AI Humanizer Works
          </h2>
          <p className="text-xl text-gray-600">
            Transform your AI-generated content into natural human text in just three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card relative overflow-hidden border border-gray-100"
            >
              <div className={`absolute top-0 left-0 w-2 h-full ${step.color}`}></div>
              <div className="p-8">
                <div className={`inline-block ${step.color} text-white text-xl font-bold rounded-lg px-4 py-2 mb-4`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="AI Humanizer in action"
            className="rounded-lg shadow-xl max-w-4xl mx-auto w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;