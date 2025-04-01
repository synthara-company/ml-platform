import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Image, Loader2, Brain, Command, Copy, Check, Download, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { AIProviderSwitch } from '../AIProviderSwitch';
import { generateImage } from '@/lib/imageGeneration';

const PHOTOREALISTIC_EXAMPLES = [
  {
    title: "AI Research Lab",
    prompt: `Modern AI research laboratory, wide angle view:
    - Clean white and glass interior
    - Blue LED ambient lighting
    - Multiple transparent display screens
    - Scientists at workstations
    - Holographic data visualizations
    - Professional photography style
    - Dramatic lighting, sharp focus`
  },
  {
    title: "Tech Startup Office",
    prompt: `Modern tech startup office space:
    - Open plan workspace
    - Floor-to-ceiling windows
    - Developers at standing desks
    - Multiple monitor setups
    - Neon company logo
    - Plants and natural elements
    - Evening golden hour lighting`
  },
  {
    title: "Data Center",
    prompt: `High-tech data center interior:
    - Rows of server racks
    - Blue LED status lights
    - Glass-walled control room
    - Network cables management
    - Technicians working
    - Cool color temperature
    - Dramatic spotlighting`
  },
  {
    title: "VR Development Studio",
    prompt: `Virtual reality development studio:
    - People wearing VR headsets
    - Large motion capture space
    - Development workstations
    - 3D character models on screens
    - Modern industrial design
    - Purple and blue accent lighting
    - Clean, minimal aesthetic`
  },
  {
    title: "Drone Testing Facility",
    prompt: `Indoor drone testing facility:
    - Flying drones with LED lights
    - Safety netting systems
    - Control station with monitors
    - Engineers with tablets
    - High ceiling warehouse style
    - Dynamic lighting
    - Industrial modern design`
  },
  {
    title: "Innovation Hub",
    prompt: `Technology innovation hub:
    - Collaborative workspace
    - Interactive touch walls
    - 3D printers in action
    - Modern meeting pods
    - People brainstorming
    - Warm accent lighting
    - Contemporary design`
  }
];

export function ImageGenerationInterface() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGeneration = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setGeneratedImage(null);
    
    try {
      const imageUrl = await generateImage(prompt);
      
      const validateImage = (url: string) => {
        return new Promise((resolve, reject) => {
          const img = document.createElement('img');
          img.onload = () => resolve(url);
          img.onerror = () => reject(new Error('Generated image URL is invalid'));
          img.src = url;
        });
      };

      await validateImage(imageUrl);
      setGeneratedImage(imageUrl);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
      console.error('Generation error:', err);
      setGeneratedImage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;
    
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download:', err);
    }
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleExampleClick = (prompt: string) => {
    setPrompt(prompt);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGeneration();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [prompt]);

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

        {/* Main Content Section */}
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
                  placeholder="Describe your imagination..."
                  className="w-full bg-black/30 border border-white/20 rounded-xl p-6 min-h-[150px] text-base sm:text-lg pr-24 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-gray-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                  <Command className="w-3 h-3" />
                  <span>+</span>
                  <span>↵</span>
                </div>
              </div>
              <Button
                onClick={handleGeneration}
                disabled={loading || !prompt.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Art
                  </>
                )}
              </Button>
            </div>

            {/* Empty State with Examples */}
            {!prompt.trim() && !generatedImage && !error && (
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
                  Synthara Image Generation
                </h3>
                <p className="text-gray-300 mb-8 text-lg">
                  Transform your ideas into stunning visual masterpieces ✨
                </p>
                
                <div className="space-y-6">
                  <p className="text-sm text-gray-400 font-medium">Example Prompts:</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {PHOTOREALISTIC_EXAMPLES.map((example, index) => (
                      <div
                        key={index}
                        onClick={() => handleExampleClick(example.prompt)}
                        className="cursor-pointer p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 text-left group"
                      >
                        <h4 className="text-lg font-medium text-white mb-2">{example.title}</h4>
                        <p className="text-sm text-gray-400 line-clamp-3">{example.prompt}</p>
                        <button className="mt-4 text-sm text-purple-400 group-hover:text-purple-300 flex items-center gap-2">
                          Use this prompt
                          <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
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

            {/* Generated Image */}
            {generatedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                  <img
                    src={generatedImage}
                    alt="Generated artwork"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  <div className="mt-6 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="text-sm text-gray-300 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-white">Prompt</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyPrompt}
                          className="text-xs flex items-center gap-2 hover:bg-white/10"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          {copied ? 'Copied!' : 'Copy Prompt'}
                        </Button>
                      </div>
                      <p className="mt-1 text-gray-400">{prompt}</p>
                    </div>
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2 hover:bg-white/10 border-white/20 text-white"
                    >
                      <Download className="w-4 h-4" />
                      Download Image
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
