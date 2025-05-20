import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Users, Lock, Server, BarChart4 } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary-600" />,
    title: 'Undetectable by AI',
    description: 'Our technology ensures your content passes through AI detection tools unnoticed.',
  },
  {
    icon: <Zap className="h-10 w-10 text-primary-600" />,
    title: 'Fast Processing',
    description: 'Get your humanized text in seconds, even for lengthy documents.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary-600" />,
    title: 'Natural Human Tone',
    description: 'Content that sounds authentically human with natural language patterns.',
  },
  {
    icon: <Lock className="h-10 w-10 text-primary-600" />,
    title: 'Private & Secure',
    description: 'Your content is encrypted and never stored without your permission.',
  },
  {
    icon: <Server className="h-10 w-10 text-primary-600" />,
    title: 'API Integration',
    description: 'Easily integrate our humanizer into your existing workflows with our API.',
  },
  {
    icon: <BarChart4 className="h-10 w-10 text-primary-600" />,
    title: 'Usage Analytics',
    description: 'Track your usage and manage your credits with our comprehensive dashboard.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced Features for Perfect Human Text
          </h2>
          <p className="text-xl text-gray-600">
            Our AI humanizer offers powerful capabilities to ensure your content is indistinguishable from human-written text.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-lg transition-shadow p-8"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;