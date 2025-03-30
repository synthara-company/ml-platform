import React from 'react';
import { motion } from 'framer-motion';
import { Box, Terminal, Cpu, Globe, ExternalLink, Code2, Sparkles, Rocket, Zap, Server, Brain, Image, Atom } from 'lucide-react';

const technologies = [
  { name: 'React 18.3', description: 'Frontend library', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'TypeScript 5.5', description: 'Type-safe JavaScript', icon: <Code2 className="w-5 h-5" /> },
  { name: 'Vite 5.4', description: 'Build tool', icon: <Zap className="w-5 h-5" /> },
  { name: 'Tailwind CSS', description: 'Utility-first CSS', icon: <Rocket className="w-5 h-5" /> },
  { name: 'Framer Motion', description: 'Animation library', icon: <Box className="w-5 h-5" /> },
  { name: 'Google Gemini AI', description: 'AI model integration', icon: <Cpu className="w-5 h-5" /> },
  { name: 'NVIDIA AI', description: 'Microservices & Model Hosting', icon: <Server className="w-5 h-5" /> },
  { name: 'React Router 6', description: 'Navigation', icon: <Globe className="w-5 h-5" /> },
  { name: 'Lucide React', description: 'Icon system', icon: <Box className="w-5 h-5" /> },
  { name: 'React Markdown', description: 'Markdown rendering', icon: <Terminal className="w-5 h-5" /> },
];

const aiModels = [
  { name: 'Llama 3.3 Nemotron Super', description: '49B parameter model', icon: <Brain className="w-5 h-5" /> },
  { name: 'DeepSeek R1', description: 'Advanced reasoning model', icon: <Brain className="w-5 h-5" /> },
  { name: 'Gemma 3', description: '27B instruction-tuned model', icon: <Brain className="w-5 h-5" /> },
  { name: 'Phi-4 Multimodal', description: 'Vision-language model', icon: <Image className="w-5 h-5" /> },
];

const microservices = [
  { name: 'AlphaFold2', description: 'Protein structure prediction', icon: <Cpu className="w-5 h-5" /> },
  { name: 'ESM2-650M', description: 'Protein language model', icon: <Brain className="w-5 h-5" /> },
  { name: 'GenMol Generate', description: 'Molecular design', icon: <Atom className="w-5 h-5" /> },
  { name: 'DALL-E 3', description: 'Image generation', icon: <Image className="w-5 h-5" /> },
];

const developmentTools = [
  { name: 'ngrok', description: 'Secure tunneling for local development', icon: <Globe className="w-5 h-5" /> },
  { name: 'ESLint 9', description: 'Code linting', icon: <Code2 className="w-5 h-5" /> },
  { name: 'Autoprefixer', description: 'CSS post-processing', icon: <Zap className="w-5 h-5" /> },
  { name: 'Vite Dev Server', description: 'Development server with HMR', icon: <Rocket className="w-5 h-5" /> },
];

interface CreditsModalProps {
  onClose: () => void;
}

export function CreditsModal({ onClose }: CreditsModalProps) {
  return (
    <motion.dialog
      id="credits-modal"
      className="modal backdrop:bg-black/50 bg-transparent"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="bg-gradient-to-br from-gray-900 to-black text-text-primary rounded-xl shadow-2xl w-full max-w-2xl p-6 border border-purple-500/20">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                <img 
                  src="https://avatars.githubusercontent.com/u/203538727?s=200&v=4"
                  alt="Synthara Logo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 mix-blend-overlay" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Technologies & Credits
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Core Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">Core Technologies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 flex items-start gap-3 hover:border-purple-500/40 transition-colors"
                >
                  <div className="text-purple-400">{tech.icon}</div>
                  <div>
                    <h4 className="font-semibold text-purple-300">{tech.name}</h4>
                    <p className="text-sm text-gray-400">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Models & Microservices */}
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">AI Models & Microservices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiModels.map((model) => (
                <div
                  key={model.name}
                  className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 flex items-start gap-3 hover:border-purple-500/40 transition-colors"
                >
                  <div className="text-purple-400">{model.icon}</div>
                  <div>
                    <h4 className="font-semibold text-purple-300">{model.name}</h4>
                    <p className="text-sm text-gray-400">{model.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NVIDIA Microservices */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-3">NVIDIA Microservices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {microservices.map((service) => (
                <div
                  key={service.name}
                  className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 flex items-start gap-3 hover:border-purple-500/40 transition-colors"
                >
                  <div className="text-purple-400">{service.icon}</div>
                  <div>
                    <h4 className="font-semibold text-purple-300">{service.name}</h4>
                    <p className="text-sm text-gray-400">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Tools */}
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">Development Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {developmentTools.map((tool) => (
                <div
                  key={tool.name}
                  className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-purple-400">{tool.icon}</div>
                    <h4 className="font-semibold text-purple-300">{tool.name}</h4>
                  </div>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Deployment</h3>
            <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
              <p className="text-gray-300">
                This application is deployed on <span className="text-white font-semibold">Vercel</span>. 
                Development environment is exposed through <span className="text-white font-semibold">ngrok</span> for testing and preview purposes.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Follow My Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://medium.com/@bniladridas"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-purple-400 transition-colors">English Network</h4>
                    <p className="text-gray-400 text-sm">My Medium Blog</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                </div>
              </a>
              <a 
                href="https://huggingface.co/cuda-unleashed"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-purple-400 transition-colors">Cuda Unleashed</h4>
                    <p className="text-gray-400 text-sm">My HuggingFace Organization</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 pt-6 border-t border-purple-500/20 text-center text-sm text-gray-400"
          >
            <p className="flex items-center justify-center gap-2">
              Maranatha Prayer Fellowship. <span className="text-red-400">❤️</span> With love, Niladri Das.
            </p>
            <p className="mt-1">© 2025 Niladri Das. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </motion.dialog>
  );
}
