import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse } from '@/lib/ai';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Brain, Wand, Loader2, Trash2, Copy, Check, Terminal, Server, 
  Cpu, Database, Network, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { SystemArchitectureVisualization } from '@/components/shared/SystemArchitectureVisualization';
import { TestVisualization } from '@/components/sections/TestVisualization';

interface TestResult {
  type: 'code' | 'explanation' | 'creative' | 'api';
  prompt: string;
  response: string;
  timestamp: number;
}

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ElementType;
}

export function Test() {
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);

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
      prompt: 'Suggest three creative ways to implement user onboarding in a machine learning application.',
      className: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      type: 'api' as const,
      name: 'API Testing',
      description: 'Test API endpoints and validate responses',
      icon: Terminal,
      prompt: 'Test the protein structure prediction endpoint with sample sequence data.',
      className: 'bg-gradient-to-br from-orange-500 to-orange-600'
    }
  ];

  const PROCESS_STEPS: ProcessStep[] = [
    {
      title: 'Request Processing',
      description: 'Analyzing and validating the test request',
      icon: Cpu
    },
    {
      title: 'AI Model Selection',
      description: 'Choosing the appropriate AI model for the task',
      icon: Brain
    },
    {
      title: 'Data Processing',
      description: 'Processing and transforming the input data',
      icon: Database
    },
    {
      title: 'Model Inference',
      description: 'Generating response using the AI model',
      icon: Network
    },
    {
      title: 'Response Optimization',
      description: 'Optimizing and formatting the final response',
      icon: Zap
    }
  ];

  const ProcessVisualization = () => (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-8 backdrop-blur-xl bg-black/30 rounded-xl p-6 border border-white/10"
        >
          <div className="flex flex-col gap-4">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isPast = index < currentStep;

              return (
                <motion.div
                  key={step.title}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-white/5' : ''
                  }`}
                  initial={false}
                  animate={{
                    opacity: isPast ? 0.5 : 1,
                    x: isActive ? 10 : 0
                  }}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive ? 'bg-purple-500/20 text-purple-400' :
                    isPast ? 'bg-green-500/20 text-green-400' :
                    'bg-white/5 text-white/40'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      isActive ? 'text-white' :
                      isPast ? 'text-green-400' :
                      'text-white/40'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-white/60">{step.description}</p>
                  </div>
                  {isPast && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto text-green-400"
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  )}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-auto text-purple-400"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /**
   * Executes a test with the AI model and manages the visualization process
   * @param type - The type of test to run ('code', 'explanation', 'creative', 'api')
   * @param prompt - The input prompt for the AI model
   */
  const runTest = async (type: 'code' | 'explanation' | 'creative' | 'api', prompt: string) => {
    // Prevent multiple simultaneous test runs
    if (loading) return;
    
    // Initialize test state
    setLoading(true);
    setError('');
    setCurrentTest(type);
    setCurrentStep(0);

    try {
      // ====================================
      // Step 1: Request Processing
      // Show initial processing animation
      // ====================================
      setCurrentStep(0);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // ====================================
      // Step 2: AI Model Selection
      // Simulate model selection process
      // ====================================
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // ====================================
      // Step 3: Data Processing
      // Enhance the prompt based on test type
      // ====================================
      setCurrentStep(2);
      let enhancedPrompt = prompt;
      
      // Add specific instructions based on test type
      switch (type) {
        case 'code':
          // For code generation, request markdown formatting
          enhancedPrompt = `${prompt}\n\nPlease format the response in markdown with proper code blocks and explanations.`;
          break;
        case 'explanation':
          // For explanations, request structured content
          enhancedPrompt = `${prompt}\n\nPlease provide a clear and structured explanation with examples where appropriate.`;
          break;
        case 'api':
          // For API tests, request JSON formatting
          enhancedPrompt = `${prompt}\n\nPlease format the response as a JSON API response with appropriate status codes and data structure.`;
          break;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));

      // ====================================
      // Step 4: Model Inference
      // Make the actual API call to the AI service
      // ====================================
      setCurrentStep(3);
      const aiResponse = await getAIResponse(enhancedPrompt);
      
      // Validate AI response
      if (!aiResponse || !aiResponse.text) {
        throw new Error('Invalid response from AI service');
      }

      // ====================================
      // Step 5: Response Optimization
      // Format and prepare the response
      // ====================================
      setCurrentStep(4);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update the results list with the new response
      // Add to beginning of array to show most recent first
      setResults(prev => [{
        type,
        prompt,
        response: aiResponse.text,
        timestamp: Date.now()
      }, ...prev]);

    } catch (error) {
      // Handle any errors that occur during the process
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      // Clean up and reset state regardless of success/failure
      setLoading(false);
      setCurrentStep(0);
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

  const renderResponse = (result: TestResult) => {
    if (result.type === 'api') {
      try {
        const jsonResponse = JSON.parse(result.response);
        return (
          <pre className="bg-black/20 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{JSON.stringify(jsonResponse, null, 2)}</code>
          </pre>
        );
      } catch {
        return <ReactMarkdown>{result.response}</ReactMarkdown>;
      }
    }
    return <ReactMarkdown>{result.response}</ReactMarkdown>;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Animated background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern animation */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[gradient_3s_linear_infinite] opacity-20" />
        
        {/* Radial gradient pulse */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(68,68,68,0.2),transparent)] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-safe pb-4 sm:py-8 relative">
        {/* Enhanced Header with glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg mt-[calc(2rem+env(safe-area-inset-top))] sm:mt-2"
        >
          <Button
            variant="ghost"
            className="hover:bg-white/10 text-white group transition-all duration-300"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Test Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tests.map(test => (
                <motion.div
                  key={test.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <test.icon className="h-6 w-6 mr-3" />
                    <h3 className="text-xl font-semibold">{test.name}</h3>
                  </div>
                  <p className="text-white/80 mb-4">{test.description}</p>
                  <Button
                    onClick={() => runTest(test.type, test.prompt)}
                    disabled={loading && currentTest === test.type}
                    className="w-full bg-white/20 hover:bg-white/30 transition-all duration-300"
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
            {results.length > 0 && (
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-500/20 text-red-200 p-6 rounded-xl border border-red-500/20 backdrop-blur-sm mb-6"
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
                    className="mb-8 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                  >
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {result.type === 'code' && <Code className="h-5 w-5 text-blue-400" />}
                          {result.type === 'explanation' && <Brain className="h-5 w-5 text-green-400" />}
                          {result.type === 'creative' && <Wand className="h-5 w-5 text-purple-400" />}
                          {result.type === 'api' && <Server className="h-5 w-5 text-orange-400" />}
                          <h3 className="text-lg font-medium">{result.type.charAt(0).toUpperCase() + result.type.slice(1)} Test</h3>
                        </div>
                        <Button
                          onClick={() => copyToClipboard(result.response, result.timestamp)}
                          variant="ghost"
                          size="sm"
                          className="text-xs flex items-center gap-2 hover:bg-white/10"
                        >
                          {copied === result.timestamp ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          {copied === result.timestamp ? 'Copied!' : 'Copy Response'}
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-gray-400">{result.prompt}</p>
                    </div>
                    <div className="p-6 bg-black/30">
                      <div className="prose prose-invert max-w-none">
                        {renderResponse(result)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Test Visualization Sidebar */}
          <div className="lg:col-span-1">
            <TestVisualization 
              testType={currentTest as 'code' | 'explanation' | 'creative' | 'api'}
              loading={loading}
              className="sticky top-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
