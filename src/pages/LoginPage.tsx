import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import SigninForm from '../components/auth/SigninForm';
import { useAuth } from '../lib/hooks';

const LoginPage: React.FC = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <Layout>
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <div className="card">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                  <p className="text-gray-600">
                    Sign in to access your account
                  </p>
                </div>
                
                <SigninForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;