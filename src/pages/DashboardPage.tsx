import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import HumanizerTool from '../components/humanizer/HumanizerTool';
import CreditUsage from '../components/dashboard/CreditUsage';
import DocumentCard from '../components/dashboard/DocumentCard';
import { useAuth } from '../lib/hooks';
import { useHumanizedTexts } from '../lib/hooks';
import { Plus, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();
  const { texts, loading: textsLoading, saveHumanizedText, deleteHumanizedText } = useHumanizedTexts();
  
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
  
  const handleSaveDocument = async (title: string) => {
    const store = (window as any).humanizerStore;
    if (store) {
      const { inputText, outputText } = store.getState();
      await saveHumanizedText(inputText, outputText, title);
    }
  };
  
  const handleDeleteDocument = async (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      await deleteHumanizedText(id);
    }
  };
  
  return (
    <Layout>
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <Link to="/pricing">
                <Button variant="outline" size="sm">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              <div className="lg:col-span-2">
                <div className="card h-full">
                  <h2 className="text-xl font-semibold mb-4">AI Humanizer</h2>
                  <HumanizerTool saveEnabled onSave={handleSaveDocument} />
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <CreditUsage />
              </div>
            </div>
            
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Your Documents</h2>
                <Link to="/pricing">
                  <Button variant="outline" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                    Buy More Credits
                  </Button>
                </Link>
              </div>
              
              {textsLoading ? (
                <div className="card flex items-center justify-center p-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                  <span className="ml-3 text-gray-600">Loading your documents...</span>
                </div>
              ) : texts.length === 0 ? (
                <div className="card text-center p-12">
                  <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-gray-100">
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Documents Yet</h3>
                  <p className="text-gray-600 mb-6">
                    When you humanize and save text, your documents will appear here.
                  </p>
                  <div className="flex justify-center">
                    <Button
                      variant="primary"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Create Your First Document
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {texts.map((text) => (
                    <DocumentCard
                      key={text.id}
                      document={text}
                      onDelete={handleDeleteDocument}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default DashboardPage;