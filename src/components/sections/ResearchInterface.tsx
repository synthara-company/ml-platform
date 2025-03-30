import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Send, Loader2, Brain, Command, Timer, Sparkles, BookOpen, Copy, Check } from 'lucide-react';
import { Button, CopyButton } from '../ui';
import { useNavigate } from 'react-router-dom';
import { AIProviderSwitch } from '../AIProviderSwitch';
import { getAIResponse, getTokenCount, type AIResponse } from '@/lib/ai';
import ReactMarkdown from 'react-markdown';

const RESEARCH_EXAMPLES = [
  {
    title: "Gemini 2.5 Pro",
    prompt: "Explain the capabilities and improvements in Google's Gemini 2.5 Pro Experimental 03-25 model, including its enhanced context window of 65,536 tokens, improved temperature control (1.0), and advanced reasoning capabilities. How does it compare to previous versions?"
  },
  {
    title: "Gemini 2.0 Flash Image Generation",
    prompt: "Describe the capabilities of Google's Gemini 2.0 Flash (Image Generation) Experimental model. Include details about its native image generation abilities, response formats, and how it differs from traditional text-to-image models. What are the key features and limitations of this experimental image generation technology?"
  },
  {
    title: "Neural Network Architecture",
    prompt: "Explain the architecture and working principles of Convolutional Neural Networks (CNNs) in computer vision. Include details about different layers, feature extraction, and practical applications in image recognition."
  },
  {
    title: "Transfer Learning",
    prompt: "What is transfer learning in machine learning? Explain its benefits, common approaches, and when it's most effective. Include practical examples of popular pre-trained models and their applications."
  },
  {
    title: "Reinforcement Learning",
    prompt: "Analyze the key components of reinforcement learning systems: agents, environments, rewards, and policies. How do algorithms like Q-learning and Deep Q Networks (DQN) work? Include real-world applications and challenges."
  },
  {
    title: "Model Optimization",
    prompt: "What are the best practices for optimizing machine learning models? Cover techniques for improving model performance, reducing overfitting, and handling computational constraints. Include specific examples and metrics."
  }
];

export function ResearchInterface() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0
  });
  const [thoughts, setThoughts] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleResearch = async () => {
    if (!query.trim() || loading) return;

    setLoading(true);
    setError(null);
    setIsGenerating(true);
    setThoughts([]);
    
    try {
      const promptTokenCount = await getTokenCount(query);
      setGenerationProgress({
        promptTokens: promptTokenCount,
        completionTokens: 0,
        totalTokens: promptTokenCount
      });

      // Initial thinking steps
      setThoughts([
        "Understanding the query...",
        "Analyzing context and scope...",
        "Gathering relevant information..."
      ]);

      const prompt = `Perform a deep analysis on the following machine learning topic: ${query}...`;
      const result = await getAIResponse(prompt);
      
      // Update thoughts with actual AI reasoning
      if (result.thoughts) {
        setThoughts(result.thoughts);
      }

      setGenerationProgress({
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        totalTokens: result.totalTokens
      });
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (prompt: string) => {
    setQuery(prompt);
  };

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleResearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0f1115] to-black text-white">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[gradient_3s_linear_infinite]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Button
            variant="ghost"
            className="hover:bg-white/10 text-white backdrop-blur-sm w-full sm:w-auto transition-all duration-300"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <AIProviderSwitch />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="flex-1 relative">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
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
                disabled={loading || !query.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Researching...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5" />
                    Research
                  </>
                )}
              </Button>
            </div>

            {/* Generation Status */}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-6 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                    <span className="text-white">Processing research query...</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Timer className="h-4 w-4" />
                    <span>{generationProgress.totalTokens} tokens processed</span>
                  </div>
                </div>

                {/* Thinking Process */}
                <div className="mt-4 space-y-2">
                  {thoughts.map((thought, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center gap-3 text-sm text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{thought}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Empty State */}
            {!query.trim() && !response && !error && (
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
                  AI Research Assistant
                </h3>
                <p className="text-gray-300 mb-8 text-lg">
                  "I've done my PhD in everything and nothing simultaneously. 
                  Quantum superposition of knowledge, you know? 🤓"
                </p>

                <div className="space-y-6">
                  <p className="text-sm text-gray-400 font-medium">Research Topic Examples:</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {RESEARCH_EXAMPLES.map((example, index) => (
                      <div
                        key={index}
                        onClick={() => handleExampleClick(example.prompt)}
                        className="cursor-pointer p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 text-left group"
                      >
                        <h4 className="text-lg font-medium text-white mb-2">{example.title}</h4>
                        <p className="text-sm text-gray-400 line-clamp-3">{example.prompt}</p>
                        <button className="mt-4 text-sm text-purple-400 group-hover:text-purple-300 flex items-center gap-2">
                          Research this topic
                          <Search className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 mb-8 backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Research Results */}
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <span className="text-sm text-purple-400">Research Results</span>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">
                      <span>Prompt: {response.promptTokens} tokens</span>
                      <span className="mx-2">•</span>
                      <span>Response: {response.completionTokens} tokens</span>
                      <span className="mx-2">•</span>
                      <span className="text-purple-400">Total: {response.totalTokens} tokens</span>
                    </div>
                    <CopyButton content={response.text} />
                  </div>
                </div>
                <div className="prose prose-invert max-w-none bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                  <ReactMarkdown>{response.text}</ReactMarkdown>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
