import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Loader2, Brain, Command, Copy, Check, Download, Sparkles, Cpu, Network, Database } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { AIProviderSwitch } from '../AIProviderSwitch';
import { getAIResponse, getTokenCount } from '@/lib/ai';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Brain,
    title: "Analyzing Prompt",
    description: "Processing and understanding the research query",
    color: "text-purple-400"
  },
  {
    icon: Database,
    title: "Accessing Knowledge Base",
    description: "Retrieving relevant information",
    color: "text-blue-400"
  },
  {
    icon: Cpu,
    title: "Processing Data",
    description: "Synthesizing information and forming insights",
    color: "text-green-400"
  },
  {
    icon: Network,
    title: "Generating Response",
    description: "Structuring and formatting the research results",
    color: "text-pink-400"
  }
];

const RESEARCH_EXAMPLES = [
  {
    title: "Advanced ML Models Analysis",
    prompt: "Analyze and compare the latest developments in large language models, focusing on architectural innovations, training methodologies, and performance metrics. Include specific examples from recent research papers and industry implementations. Cover topics like attention mechanisms, sparse expert models, and efficient fine-tuning approaches."
  },
  {
    title: "AI Image Generation Evolution",
    prompt: "Provide a comprehensive analysis of the evolution in AI image generation models, from GANs to diffusion models and multimodal architectures. Focus on technical breakthroughs, architectural improvements, and real-world applications. Include comparisons of different approaches and their impact on generation quality and efficiency."
  },
  {
    title: "Neural Architecture Search",
    prompt: "Explain recent advances in automated neural architecture search (NAS), including gradient-based approaches, reinforcement learning methods, and efficient search strategies. Discuss the trade-offs between different methods, computational requirements, and practical applications in model design."
  },
  {
    title: "Transformer Architecture Innovations",
    prompt: "Detail the latest innovations in transformer architectures, including improvements in efficiency, attention mechanisms, and scaling strategies. Cover recent developments like sparse attention, linear transformers, and state space models. Include practical implications for model deployment and performance."
  }
];

export function ResearchInterface() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [tokenCount, setTokenCount] = useState({ prompt: 0, completion: 0, total: 0 });
  const [currentStep, setCurrentStep] = useState(0);

  const handleResearch = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResponse(null);
    
    try {
      // Start the step animation
      const stepDuration = 1000; // 1 second per step
      PROCESS_STEPS.forEach((_, index) => {
        setTimeout(() => {
          setCurrentStep(index);
        }, index * stepDuration);
      });

      const promptTokens = await getTokenCount(prompt);
      const result = await getAIResponse(prompt);
      
      setResponse(result.text);
      setTokenCount({
        prompt: result.promptTokens,
        completion: result.completionTokens,
        total: result.totalTokens
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate research');
      console.error('Research error:', err);
    } finally {
      setLoading(false);
      setCurrentStep(0);
    }
  };

  const handleCopy = async () => {
    if (!response) return;
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExampleClick = (prompt: string) => {
    setPrompt(prompt);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleResearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [prompt]);

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
                  <div className={`relative ${step.color}`}>
                    <Icon className="w-6 h-6" />
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-current rounded-full"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                    )}
                  </div>
                  <div>
                    <h4 className={`font-medium ${isActive ? step.color : 'text-white'}`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                  {isActive && (
                    <motion.div
                      className="ml-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Animated background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern animation */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[gradient_3s_linear_infinite] opacity-20" />
        
        {/* Radial gradient pulse */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(68,68,68,0.2),transparent)] animate-pulse" />
        
        {/* Decorative blurred circles */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse" />
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
          <AIProviderSwitch />
        </motion.div>

        {/* Main Content Section with Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
          {/* Research Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 shadow-2xl border border-white/10"
          >
            <div className="relative backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="flex-1 relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="What would you like to research?"
                    className="w-full bg-black/30 border border-white/20 rounded-xl p-6 min-h-[150px] text-base sm:text-lg pr-24 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-gray-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                    <Command className="w-3 h-3" />
                    <span>+</span>
                    <span>↵</span>
                  </div>
                </div>
                <Button
                  onClick={handleResearch}
                  disabled={loading || !prompt.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Researching...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Research
                    </>
                  )}
                </Button>
              </div>

              {/* Empty State */}
              {!prompt.trim() && !response && !error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center p-8 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full" />
                    <div className="relative w-16 h-16 mx-auto mb-6 rounded-xl overflow-hidden">
                      <img 
                        src="https://avatars.githubusercontent.com/u/203538727?s=200&v=4"
                        alt="Synthara Logo"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 mix-blend-overlay" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Synthara Research Assistant
                  </h3>
                  <p className="text-gray-300 mb-8 text-lg">
                    Explore the depths of knowledge with AI-powered research ✨
                  </p>
                </motion.div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                  {error}
                </div>
              )}

              <ProcessVisualization />

              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {response}
                      </ReactMarkdown>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="text-sm text-gray-300 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-white">Research Results</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className="text-xs flex items-center gap-2 hover:bg-white/10"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                            {copied ? 'Copied!' : 'Copy Response'}
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400">
                          <span>Prompt: {tokenCount.prompt} tokens</span>
                          <span>•</span>
                          <span>Response: {tokenCount.completion} tokens</span>
                          <span>•</span>
                          <span className="text-purple-400">Total: {tokenCount.total} tokens</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Research Examples Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 shadow-2xl border border-white/10 h-fit lg:sticky lg:top-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Research Examples
              </h3>
            </div>
            <div className="space-y-4">
              {RESEARCH_EXAMPLES.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => handleExampleClick(example.prompt)}
                >
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <h4 className="font-medium text-purple-400 mb-2 group-hover:text-purple-300 transition-colors">
                      {example.title}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors">
                      {example.prompt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
