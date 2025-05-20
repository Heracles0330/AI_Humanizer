import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="card h-full">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Email</h3>
                      <p className="text-gray-600">support@humanizeai.com</p>
                      <p className="text-gray-600">info@humanizeai.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Office</h3>
                      <p className="text-gray-600">123 Innovation Drive</p>
                      <p className="text-gray-600">San Francisco, CA 94107</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">Mon-Fri: 9AM - 5PM PST</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium text-lg mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-primary-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-primary-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-primary-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-primary-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="card">
                <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                
                {isSubmitted ? (
                  <div className="bg-success-50 text-success-700 p-6 rounded-lg text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                    <Button
                      className="mt-4"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        label="Full Name"
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        label="Subject"
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Textarea
                        label="Message"
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;