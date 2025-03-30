import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse } from '@/lib/ai';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Brain, Wand, Loader2, Trash2, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface TestResult {
  type: 'code' | 'explanation' | 'creative';
  prompt: string;
  response: string;
  timestamp: number;
}

export function Test() {
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  const tests = [
    {
      type: 'code' as const,
      name: 'Code Generation',
      description: 'Generate React components with detailed explanations',
      icon: Code,
      prompt: 'Write a React component that creates an animated loading spinner with CSS. Include comments explaining the code.',
      className: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      type: 'explanation' as const,
      name: 'Technical Concepts',
      description: 'Get clear explanations of complex topics',
      icon: Brain,
      prompt: "Explain how React's Virtual DOM works and why it improves performance. Keep it clear and concise.",
      className: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      type: 'creative' as const,
      name: 'Creative Solutions',
      description: 'Generate innovative approaches to problems',
      icon: Wand,
      prompt: 'Suggest three creative ways to optimize a React application\'s performance.',
      className: 'bg-gradient-to-br from-purple-500 to-purple-600'
    }
  ];

  const runTest = async (type: 'code' | 'explanation' | 'creative', prompt: string) => {
    if (loading) return;
    
    setLoading(true);
    setError('');
    setCurrentTest(type);

    try {
      let enhancedPrompt = prompt;
      if (type === 'code') {
        enhancedPrompt = `${prompt}\n\nPlease format the response in markdown with proper code blocks and explanations.`;
      } else if (type === 'explanation') {
        enhancedPrompt = `${prompt}\n\nPlease provide a clear and structured explanation with examples where appropriate.`;
      }

      const aiResponse = await getAIResponse(enhancedPrompt);
      
      if (!aiResponse || !aiResponse.text) {
        throw new Error('Invalid response from AI service');
      }

      setResults(prev => [{
        type,
        prompt,
        response: aiResponse.text,
        timestamp: Date.now()
      }, ...prev]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setCurrentTest(null);
    }
  };

  const copyToClipboard = async (text: string, timestamp: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(timestamp);
    setTimeout(() => setCopied(null), 2000);
  };

  const clearResults = () => {
    setResults([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white hover:text-white/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {results.length > 0 && (
            <Button
              onClick={clearResults}
              variant="destructive"
              className="bg-red-500/20 hover:bg-red-500/30"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Results
            </Button>
          )}
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tests.map((test) => (
            <motion.div
              key={test.type}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "rounded-xl p-6 text-white shadow-lg backdrop-blur-sm",
                test.className
              )}
            >
              <div className="flex items-center mb-4">
                <test.icon className="h-6 w-6 mr-3" />
                <h3 className="text-xl font-semibold">{test.name}</h3>
              </div>
              <p className="text-white/80 mb-4">{test.description}</p>
              <Button
                onClick={() => runTest(test.type, test.prompt)}
                disabled={loading && currentTest === test.type}
                className="w-full bg-white/20 hover:bg-white/30"
              >
                {loading && currentTest === test.type ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Run Test'
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          {results.map((result) => (
            <motion.div
              key={result.timestamp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 rounded-xl p-6 mb-6 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  {result.type === 'code' && <Code className="h-5 w-5 mr-2 text-blue-400" />}
                  {result.type === 'explanation' && <Brain className="h-5 w-5 mr-2 text-green-400" />}
                  {result.type === 'creative' && <Wand className="h-5 w-5 mr-2 text-purple-400" />}
                  <h4 className="text-lg font-medium">
                    {tests.find(t => t.type === result.type)?.name}
                  </h4>
                </div>
                <Button
                  onClick={() => copyToClipboard(result.response, result.timestamp)}
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white"
                >
                  {copied === result.timestamp ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{result.response}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
