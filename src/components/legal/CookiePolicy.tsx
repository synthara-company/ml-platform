import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Clock, Shield, Settings, AlertCircle } from 'lucide-react';

export const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1c2128] text-white relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(68,68,68,0.2),transparent)] animate-pulse" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 p-6 md:p-8">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-500/20 blur-xl rounded-full" />
              <h1 className="text-4xl font-bold relative">Cookie Policy</h1>
            </div>
            <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </motion.div>

          <section className="mt-12 space-y-12">
            {/* What Are Cookies Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="absolute -top-6 -left-6 p-4 bg-amber-500/20 rounded-xl backdrop-blur-xl border border-white/10">
                <Cookie className="w-8 h-8 text-amber-400" />
              </div>
              <div className="ml-8">
                <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
                <p className="text-gray-300 leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website. 
                  They help us provide you with a better experience and are essential for certain features to work properly.
                </p>
              </div>
            </motion.div>

            {/* Types of Cookies */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="absolute -top-6 -right-6 p-4 bg-blue-500/20 rounded-xl backdrop-blur-xl border border-white/10">
                <Settings className="w-8 h-8 text-blue-400" />
              </div>
              <div className="mr-8">
                <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
                <ul className="space-y-4">
                  {[
                    {
                      title: 'Essential Cookies',
                      description: 'Required for basic site functionality and security features'
                    },
                    {
                      title: 'Analytics Cookies',
                      description: 'Help us understand how visitors interact with our website'
                    },
                    {
                      title: 'Preference Cookies',
                      description: 'Remember your settings and improve your experience'
                    }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + (index * 0.1) }}
                      className="backdrop-blur-sm bg-white/5 p-4 rounded-xl"
                    >
                      <h3 className="text-lg font-semibold text-amber-400">{item.title}</h3>
                      <p className="text-gray-300 mt-1">{item.description}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Cookie Duration */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="absolute -top-6 -left-6 p-4 bg-green-500/20 rounded-xl backdrop-blur-xl border border-white/10">
                <Clock className="w-8 h-8 text-green-400" />
              </div>
              <div className="ml-8">
                <h2 className="text-2xl font-semibold mb-4">Cookie Duration</h2>
                <ul className="space-y-3">
                  {[
                    'Session cookies: Temporary and expire when you close your browser',
                    'Persistent cookies: Remain on your device for a set period',
                    'Third-party cookies: Set by external services we use'
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + (index * 0.1) }}
                      className="flex items-center space-x-3 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Managing Cookies */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="relative backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="absolute -top-6 -right-6 p-4 bg-purple-500/20 rounded-xl backdrop-blur-xl border border-white/10">
                <AlertCircle className="w-8 h-8 text-purple-400" />
              </div>
              <div className="mr-8">
                <h2 className="text-2xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
                </p>
                <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm">
                  <p className="text-amber-400 font-semibold">Please Note:</p>
                  <p className="text-gray-300 mt-2">
                    If you disable cookies, some features of our website may not function properly.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          <motion.footer 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <p className="text-gray-400 text-center">
              For more information about our cookie practices, please contact us.
            </p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
};