import React from 'react';
import { motion } from 'framer-motion';
import { Users, X } from 'lucide-react';

interface HiringFormProps {
  onClose: () => void;
}

export function HiringForm({ onClose }: HiringFormProps) {
  return (
    <motion.dialog
      id="hiring-modal"
      className="modal backdrop:bg-black/50 bg-transparent fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden border border-purple-500/20">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content container */}
        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Join Our Team
                </h2>
                <p className="text-gray-400 mt-1">
                  Be part of something extraordinary
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg
                           text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/40
                           focus:ring-2 focus:ring-purple-500/10 transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg
                           text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/40
                           focus:ring-2 focus:ring-purple-500/10 transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Desired Role
              </label>
              <select
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg
                         text-white focus:outline-none focus:border-purple-500/40
                         focus:ring-2 focus:ring-purple-500/10 transition-all duration-200"
              >
                <option value="">Select a role</option>
                <option value="ml-engineer">ML Engineer</option>
                <option value="frontend">Frontend Developer</option>
                <option value="backend">Backend Developer</option>
                <option value="designer">UI/UX Designer</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Why do you want to join us?
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/20 rounded-lg
                         text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/40
                         focus:ring-2 focus:ring-purple-500/10 transition-all duration-200 resize-none"
                placeholder="Tell us about your motivation..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg
                         text-white font-medium hover:opacity-90 transition-opacity
                         focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.dialog>
  );
}
