import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, X, Send, Loader2, CheckCircle, AlertCircle, Camera, Info } from 'lucide-react';
import { Button } from './ui/button';

interface BugReportProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BugReport({ isOpen, onClose }: BugReportProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps: '',
    expectedBehavior: '',
    actualBehavior: '',
    browserInfo: navigator.userAgent,
    screenshot: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitting(false);
    setSubmitted(true);
    
    // Reset after showing success message
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setStep(1);
      setFormData({
        title: '',
        description: '',
        steps: '',
        expectedBehavior: '',
        actualBehavior: '',
        browserInfo: navigator.userAgent,
        screenshot: null,
      });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-red-500/20"
          >
            <div className="p-6 border-b border-red-500/20 bg-gradient-to-r from-red-500/10 via-red-400/5 to-red-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                    <Bug className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Report an Issue</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-red-500/20 text-red-400"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-4 py-8"
                >
                  <div className="p-3 rounded-full bg-green-500/20">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                  <p className="text-lg text-white font-semibold">Thank you for your report!</p>
                  <p className="text-sm text-gray-400 text-center">
                    We appreciate your feedback and will investigate this issue promptly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">
                        Issue Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-800/50 rounded-lg border border-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 text-white placeholder-gray-400"
                        placeholder="Brief description of the issue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">
                        Detailed Description
                      </label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 text-white placeholder-gray-400 min-h-[120px]"
                        placeholder="What went wrong? Please provide as much detail as possible."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">
                        Steps to Reproduce
                      </label>
                      <textarea
                        value={formData.steps}
                        onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 text-white placeholder-gray-400"
                        placeholder="1. First step&#10;2. Second step&#10;3. ..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                          Expected Behavior
                        </label>
                        <textarea
                          value={formData.expectedBehavior}
                          onChange={(e) => setFormData({ ...formData, expectedBehavior: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 text-white placeholder-gray-400"
                          placeholder="What should have happened?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                          Actual Behavior
                        </label>
                        <textarea
                          value={formData.actualBehavior}
                          onChange={(e) => setFormData({ ...formData, actualBehavior: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 text-white placeholder-gray-400"
                          placeholder="What happened instead?"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-red-400" />
                        Screenshot (optional)
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-red-500/20 rounded-lg hover:border-red-500/40 transition-colors">
                        <div className="space-y-1 text-center">
                          <div className="flex text-sm text-gray-400">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-red-400 hover:text-red-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500/40">
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => setFormData({ ...formData, screenshot: e.target.files?.[0] || null })}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-500/10 rounded-lg p-4 flex items-start gap-3">
                      <Info className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-300">
                        Your browser information will be automatically included to help us diagnose the issue.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-red-500/20">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={onClose}
                      className="hover:bg-red-500/20 text-gray-300"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Report
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
