import React from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Key, UserCheck, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1c2128] text-white relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-noise mix-blend-soft-light" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(68,68,68,0.15),transparent)]" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-full" />
              <h1 className="text-4xl font-bold relative">Privacy Policy</h1>
            </div>
            <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </motion.div>

          <section className="mt-12 space-y-12">
            {/* Section 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="absolute -top-6 -left-6 p-4 bg-blue-500/20 rounded-xl backdrop-blur-xl border border-white/10">
                <Database className="w-8 h-8 text-blue-400" />
              </div>
              <div className="ml-8">
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <ul className="space-y-3">
                  {[
                    'Name and age for personalization purposes',
                    'Usage data and learning progress',
                    'Technical information about your device and browser'
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      className="flex items-center space-x-3 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Additional sections similar to Terms of Service... */}
            {/* Continue with sections 2-4 following the same pattern */}
          </section>

          <motion.footer 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <p className="text-gray-400 text-center">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
};
