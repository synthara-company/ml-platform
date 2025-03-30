import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Image, Loader2, Brain, Command, Copy, Check, Download, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { AIProviderSwitch } from '../AIProviderSwitch';
import { generateImage } from '@/lib/imageGeneration';

const PROMPT_EXAMPLES = [
  {
    title: "Peaceful Garden",
    prompt: "A peaceful garden bathed in the warm glow of the morning sun. A lone figure, dressed in simple yet elegant clothes, tends to the vibrant flowers, their hands gently brushing against the petals. Butterflies flutter around, and a small fountain trickles softly in the background. Lush green vines climb an old wooden trellis, while a cherry blossom tree in full bloom casts delicate pink petals into the breeze. The scene exudes tranquility, harmony, and a deep connection between humans and nature."
  },
  {
    title: "Space Launch",
    prompt: "A sleek, futuristic rocket poised on a high-tech launchpad beneath a vast starry sky. The rocket's metallic body gleams under powerful floodlights, with intricate details hinting at advanced engineering. As it prepares for takeoff, billowing clouds of steam and fire create a dramatic display, while in the background, a vibrant aurora illuminates the horizon and distant planets hint at unexplored frontiers. The scene captures the excitement and mystery of space exploration."
  },
  {
    title: "Cyberpunk City",
    prompt: "A bustling cyberpunk metropolis at night, illuminated by countless neon signs and holographic advertisements. Towering skyscrapers pierce through low-hanging clouds, their surfaces covered in LED displays. Flying vehicles weave between buildings while street-level vendors sell glowing street food. Rain-slicked streets reflect the vibrant colors above, creating a mirror world of light and shadow. Cybernetic citizens walk past with glowing augmentations, their forms silhouetted against the technicolor backdrop."
  },
  {
    title: "Ancient Library",
    prompt: "An vast ancient library stretching endlessly in all directions. Towering wooden bookshelves reach impossibly high, connected by ornate spiral staircases and floating platforms. Rays of golden sunlight pierce through stained glass windows, illuminating dancing dust particles. Ancient tomes and scrolls fill every shelf, some emanating a subtle magical glow. Floating orbs of light serve as guides through the labyrinthine corridors of knowledge."
  },
  {
    title: "Deep Sea Discovery",
    prompt: "A bioluminescent deep sea scene featuring an advanced submarine discovering an ancient underwater ruin. Strange and beautiful sea creatures with natural light displays swim around the structure. The submarine's powerful lights reveal intricate carvings and mysterious symbols on the ancient stonework. Gentle currents move translucent sea life while particles float in the beams of light, creating an otherworldly atmosphere in the depths."
  },
  {
    title: "Quantum Laboratory",
    prompt: "A cutting-edge quantum computing laboratory with holographic displays showing complex mathematical equations and atomic structures. Sleek quantum processors emit a soft blue glow while suspended in electromagnetic fields. Scientists in clean room suits work with advanced instruments while 3D visualizations of quantum phenomena float in the air. The scene combines ultra-modern technology with the mysterious nature of quantum mechanics, rendered in a cool color palette of blues and silvers."
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
                    {PROMPT_EXAMPLES.map((example, index) => (
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
