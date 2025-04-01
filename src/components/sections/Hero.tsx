import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Search, Cpu, Github, Twitter, 
  Linkedin, Mail, BookOpen, Ship, Cloud, Code2, 
  Image, Copyright, X, Brain, MessageSquare, Server,
  Users, FileText, TrendingUp, ExternalLink 
} from 'lucide-react';
import { Button } from '../ui/button';
import { CreditsModal } from '../ui/CreditsModal';
import { HiringForm } from '../ui/HiringForm';
import { generateHeroImage } from '@/lib/imageGeneration';
import { SystemRequirements } from '../SystemRequirements';
import { SystemRequirementsChecker } from '../SystemRequirementsChecker';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';

const GradientBlur = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/20 to-purple-500/10 blur-[100px] opacity-50" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-300" />
  </div>
);

const GridPattern = () => (
  <div className="absolute inset-0 pointer-events-none opacity-30">
    <div className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                       linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)`,
      backgroundSize: '64px 64px'
    }} />
  </div>
);

const FloatingElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/20 rounded-full"
        initial={{ 
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight 
        }}
        animate={{
          y: [null, Math.random() * -500],
          opacity: [0.2, 0]
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}
  </div>
);

const MainHeading = () => (
  <div className="relative">
    <motion.h1
      className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Machine Learning
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
        Made Simple
      </span>
    </motion.h1>
    <motion.p
      className="mt-6 text-xl text-gray-400 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      Your interactive guide to mastering machine learning concepts. Built with practical implementation experience and industry best practices.
    </motion.p>
  </div>
);

const ActionButtons = () => (
  <motion.div
    className="flex flex-wrap gap-4 mt-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    <Button
      onClick={() => window.open('https://docs.synthara.ai', '_blank')}
      className="relative group px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-300"
    >
      <span className="relative z-10">Get Started</span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
    </Button>
    
    <Button
      onClick={() => window.open('https://github.com/synthara-ai', '_blank')}
      className="px-8 py-3 bg-black/30 backdrop-blur-xl text-white font-medium rounded-lg border border-white/10 hover:bg-black/40 hover:border-white/20 transition-all duration-300"
    >
      View on GitHub
    </Button>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description }: {
  icon: LucideIcon,
  title: string,
  description: string
}) => (
  <motion.div
    className="relative group p-6 bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
    <Icon className="w-8 h-8 text-purple-400 mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const CompanySection = () => {
  const techStack = [
    { name: 'React', color: 'purple' },
    { name: 'TypeScript', color: 'blue' },
    { name: 'Node.js', color: 'green' },
    { name: 'Python', color: 'yellow' },
    { name: 'TensorFlow', color: 'red' },
    { name: 'PyTorch', color: 'indigo' }
  ];

  const benefits = [
    'Competitive salary',
    'Equity options',
    'Flexible hours',
    'Remote work',
    'Professional development'
  ];

  const workCulture = [
    'Remote-first',
    'Global team',
    'Flexible schedule',
    'Innovation-driven'
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/company/synthara-engineering/',
      color: 'text-blue-400'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/synthara-company',
      color: 'text-purple-400'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="max-w-4xl mx-auto px-4 py-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10"
    >
      {/* Company Overview */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">About Synthara</h2>
        <p className="text-gray-400">
          We are a cutting-edge ML Learning Platform focused on building innovative AI/ML solutions
          and creating interactive learning experiences.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white text-center mb-4">Our Tech Stack</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map(({ name, color }) => (
            <span 
              key={name}
              className={`px-3 py-1 bg-${color}-500/20 rounded-full text-sm text-${color}-300`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white text-center mb-4">Benefits</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {benefits.map((benefit) => (
            <span 
              key={benefit}
              className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300"
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>

      {/* Work Culture */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white text-center mb-4">Work Culture</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {workCulture.map((culture) => (
            <span 
              key={culture}
              className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300"
            >
              {culture}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
        <div className="flex justify-center gap-6">
          {socialLinks.map(({ name, icon: Icon, url, color }) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${color} hover:underline flex items-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const InteractiveTechWeb = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  
  const techNodes = [
    { id: 'ai', label: 'AI/ML', icon: Brain, x: 50, y: 50, color: 'purple' },
    { id: 'cloud', label: 'Cloud', icon: Cloud, x: 75, y: 25, color: 'blue' },
    { id: 'dev', label: 'Development', icon: Code2, x: 25, y: 75, color: 'green' },
    { id: 'research', label: 'Research', icon: Search, x: 75, y: 75, color: 'yellow' },
    { id: 'infra', label: 'Infrastructure', icon: Server, x: 25, y: 25, color: 'red' }
  ];

  // Memoize the connections to prevent unnecessary re-renders
  const connections = useMemo(() => 
    techNodes.flatMap((node1) => 
      techNodes
        .filter(node2 => node1.id !== node2.id)
        .map(node2 => ({
          id: `${node1.id}-${node2.id}`,
          source: node1,
          target: node2
        }))
    ),
    []
  );

  return (
    <motion.div 
      className="relative h-[400px] mb-12 backdrop-blur-xl bg-black/20 rounded-xl border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <g>
          {connections.map(({ id, source, target }) => (
            <motion.line
              key={id}
              x1={`${source.x}%`}
              y1={`${source.y}%`}
              x2={`${target.x}%`}
              y2={`${target.y}%`}
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                stroke: hoveredTech ? 
                  (hoveredTech === source.id || hoveredTech === target.id ? 
                    'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)') : 
                  'rgba(255,255,255,0.1)'
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>

      {/* Tech Nodes */}
      {techNodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className={`relative p-4 rounded-full backdrop-blur-md
              ${hoveredTech === node.id ? 
                `bg-${node.color}-500/30 border-${node.color}-400/50` : 
                'bg-white/5 border-white/10'} 
              border transition-colors duration-300 cursor-pointer`}
            whileHover={{ scale: 1.2 }}
            onHoverStart={() => setHoveredTech(node.id)}
            onHoverEnd={() => setHoveredTech(null)}
          >
            <node.icon 
              className={`w-6 h-6 ${
                hoveredTech === node.id ? 
                `text-${node.color}-400` : 
                'text-white'
              }`} 
            />
            
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: hoveredTech === node.id ? 1 : 0,
                y: hoveredTech === node.id ? 0 : 10
              }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2
                whitespace-nowrap text-sm font-medium bg-black/90 
                text-white px-3 py-1.5 rounded-full"
            >
              {node.label}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
    </motion.div>
  );
};

const popularModels = [
  { 
    label: 'Llama 3.3 Nemotron Super', 
    icon: Brain, 
    color: 'bg-white/5',
    badge: 'NEW',
    badgeColor: 'bg-green-500/20 text-green-300', 
    action: () => window.open('https://build.nvidia.com/nvidia/llama-3_3-nemotron-super-49b-v1', '_blank'),
    description: '49B parameter model with enhanced reasoning and instruction following'
  },
  { 
    label: 'DeepSeek R1', 
    icon: Brain, 
    color: 'bg-white/5',
    badge: 'NEW',
    badgeColor: 'bg-blue-500/20 text-blue-300', 
    action: () => window.open('https://build.nvidia.com/deepseek-ai/deepseek-r1', '_blank'),
    description: 'Advanced reasoning model with strong mathematical capabilities'
  },
  { 
    label: 'Llama 3.1 Nemotron Nano', 
    icon: Brain, 
    color: 'bg-white/5',
    badge: 'EFFICIENT',
    badgeColor: 'bg-purple-500/20 text-purple-300', 
    action: () => window.open('https://build.nvidia.com/nvidia/llama-3_1-nemotron-nano-8b-v1', '_blank'),
    description: '8B parameter model optimized for efficiency and speed'
  },
  { 
    label: 'Gemma 3', 
    icon: Brain, 
    color: 'bg-white/5',
    badge: 'GOOGLE',
    badgeColor: 'bg-yellow-500/20 text-yellow-300', 
    action: () => window.open('https://build.nvidia.com/google/gemma-3-27b-it', '_blank'),
    description: '27B instruction-tuned model with strong multilingual capabilities'
  },
  { 
    label: 'Phi-4 Multimodal', 
    icon: Image, 
    color: 'bg-white/5',
    badge: 'MICROSOFT',
    badgeColor: 'bg-blue-500/20 text-blue-300', 
    action: () => window.open('https://build.nvidia.com/microsoft/phi-4-multimodal-instruct', '_blank'),
    description: 'Advanced vision-language model with instruction following'
  },
  { 
    label: 'Cosmos Predict', 
    icon: Brain, 
    color: 'bg-white/5',
    badge: 'NVIDIA',
    badgeColor: 'bg-green-500/20 text-green-300', 
    action: () => window.open('https://build.nvidia.com/nvidia/cosmos-predict1-7b', '_blank'),
    description: '7B parameter model specialized in predictive analytics'
  }
];

const PopularModelsSection = () => (
  <div className="mt-12 mb-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
      Popular Models
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {popularModels.map((model) => (
        <motion.button
          key={model.label}
          onClick={model.action}
          whileHover={{ scale: 1.02 }}
          className={`relative group overflow-hidden ${model.color} p-6 rounded-xl border border-purple-500/20 
                     hover:border-purple-500/40 transition-all duration-300 text-left w-full`}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg
                            group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
                <model.icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-white group-hover:text-purple-200 transition-colors">
                  {model.label}
                </h3>
                {model.badge && (
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${model.badgeColor}`}>
                    {model.badge}
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
              {model.description}
            </p>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-blue-500/10 
                          rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                          rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
          </div>
        </motion.button>
      ))}
    </div>
  </div>
);

const TechnologyVisualization = () => {
  const technologies = [
    { icon: Brain, color: 'purple', orbit: 0 },
    { icon: Cloud, color: 'blue', orbit: 1 },
    { icon: Code2, color: 'green', orbit: 2 },
    { icon: Search, color: 'yellow', orbit: 1 },
    { icon: Server, color: 'red', orbit: 2 },
    { icon: TrendingUp, color: 'indigo', orbit: 0 }
  ];

  return (
    <motion.div 
      className="relative h-[300px] w-full mb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* Center point */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    w-4 h-4 bg-white rounded-full blur-sm" />
      
      {/* Orbital paths */}
      {[0, 1, 2].map((orbit) => (
        <div
          key={orbit}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     border border-white/10 rounded-full"
          style={{
            width: `${(orbit + 1) * 140}px`,
            height: `${(orbit + 1) * 140}px`
          }}
        />
      ))}

      {/* Technology icons */}
      {technologies.map((tech, index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + tech.orbit * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <motion.div
            className={`absolute bg-${tech.color}-500/20 backdrop-blur-sm rounded-full 
                       border border-${tech.color}-500/30 p-3
                       -translate-x-1/2 -translate-y-1/2`}
            style={{
              left: `${(tech.orbit + 1) * 70}px`,
            }}
            whileHover={{ scale: 1.2, backgroundColor: `rgba(var(--${tech.color}-rgb), 0.3)` }}
          >
            <tech.icon className={`w-6 h-6 text-${tech.color}-400`} />
            
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-${tech.color}-500/20 rounded-full blur-xl`} />
          </motion.div>
        </motion.div>
      ))}

      {/* Particle effects */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/30 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: Math.random() * 300 - 150,
            y: Math.random() * 300 - 150,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
};

const ParticleBackground = () => {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      className="absolute inset-0"
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          opacity: 0
        },
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { 
            value: ["#8b5cf6", "#3b82f6", "#06b6d4", "#10b981"] 
          },
          shape: {
            type: ["circle", "triangle", "polygon"],
            polygon: { nb_sides: 6 }
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 4,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#8b5cf6",
            opacity: 0.4,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.1,
              color: "#3b82f6"
            }
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: ["grab", "bubble"]
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 200,
              line_linked: {
                opacity: 0.8
              }
            },
            bubble: {
              distance: 200,
              size: 12,
              duration: 2,
              opacity: 0.8,
              speed: 3
            },
            push: {
              particles_nb: 4
            }
          }
        }
      }}
    />
  );
};

const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <div className="relative w-full h-full">
        {/* Horizontal lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-[2px]"
            style={{
              top: `${i * 5}%`,
              background: `linear-gradient(90deg, 
                transparent 0%, 
                ${i % 2 ? '#8b5cf6' : '#3b82f6'} 50%, 
                transparent 100%)`,
              animation: `pulseWidth ${3 + i % 4}s ease-in-out infinite`,
              opacity: 0.3
            }}
          />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-[2px]"
            style={{
              left: `${i * 5}%`,
              background: `linear-gradient(180deg, 
                transparent 0%, 
                ${i % 2 ? '#06b6d4' : '#10b981'} 50%, 
                transparent 100%)`,
              animation: `pulseHeight ${4 + i % 3}s ease-in-out infinite`,
              opacity: 0.3
            }}
          />
        ))}
        {/* Glowing orbs at intersections */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute w-4 h-4 rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 15}%`,
              background: `radial-gradient(circle, 
                ${i % 2 ? '#8b5cf6' : '#3b82f6'} 0%, 
                transparent 70%)`,
              animation: `float ${5 + i}s ease-in-out infinite`,
              filter: 'blur(4px)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const FloatingTechStack = () => {
  const technologies = [
    { name: 'React', color: 'blue', icon: '⚛️' },
    { name: 'TypeScript', color: 'cyan', icon: '📘' },
    { name: 'Python', color: 'yellow', icon: '🐍' },
    { name: 'TensorFlow', color: 'orange', icon: '🧠' },
    { name: 'PyTorch', color: 'red', icon: '🔥' },
    { name: 'scikit-learn', color: 'green', icon: '🤖' }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className={`absolute backdrop-blur-sm text-${tech.color}-400 text-sm font-medium 
                     px-4 py-2 rounded-xl bg-${tech.color}-500/20 border border-${tech.color}-500/30
                     shadow-lg shadow-${tech.color}-500/20`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1],
            x: Math.sin(index) * 200,
            y: Math.cos(index) * 200,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.3,
          }}
          style={{
            left: '50%',
            top: '50%',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{tech.icon}</span>
            {tech.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Add these animations to your global CSS or style tag
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes pulseWidth {
      0%, 100% { transform: scaleX(0.8); opacity: 0.3; }
      50% { transform: scaleX(1.2); opacity: 0.6; }
    }
    
    @keyframes pulseHeight {
      0%, 100% { transform: scaleY(0.8); opacity: 0.3; }
      50% { transform: scaleY(1.2); opacity: 0.6; }
    }
    
    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(20px, -20px); }
    }
    
    .glow {
      filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
    }
  `}</style>
);

const PoweredBySection = () => {
  const partners = [
    { 
      name: 'Vercel', 
      logo: '/vercel.svg',
      width: 120
    },
    { 
      name: 'Google Cloud', 
      logo: '/google-cloud.svg',
      width: 160
    }
  ];

  return (
    <div className="mt-16">
      <p className="text-center text-sm text-gray-400 mb-8">Trusted by leading companies</p>
      <div className="flex flex-wrap justify-center items-center gap-12">
        {partners.map((partner) => (
          <div 
            key={partner.name}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/10 to-purple-500/0 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              style={{ 
                width: partner.width,
                height: 'auto',
                filter: 'brightness(0) invert(1)',
                opacity: 0.7
              }}
              className="relative transition-all duration-300 group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const AnimatedTitle = () => {
  const words = [
    { text: "Machine", color: "from-purple-400" },
    { text: "Learning", color: "from-blue-400" },
    { text: "Platform", color: "from-purple-400" }
  ];

  return (
    <div className="relative mb-12">
      {/* Animated background effects */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-32 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-75" />
      </div>

      {/* Neural network visualization */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Animated text */}
      <motion.div 
        className="relative flex flex-col items-center justify-center space-y-2 md:space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {words.map((word, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <motion.h1 
              className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r 
                         ${word.color} via-white to-transparent bg-clip-text text-transparent
                         hover:scale-105 transition-transform duration-300`}
              whileHover={{ scale: 1.05 }}
            >
              {word.text}
            </motion.h1>
            
            {/* Floating particles around text */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  `radial-gradient(circle at 50% 50%, ${word.color.includes('purple') ? '#a855f7' : '#3b82f6'}20 0%, transparent 50%)`,
                  `radial-gradient(circle at 50% 50%, ${word.color.includes('purple') ? '#a855f7' : '#3b82f6'}10 0%, transparent 70%)`
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
        initial={{ width: "0%" }}
        animate={{ width: "60%" }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
};

export function Hero() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(true);
  const [showHiringForm, setShowHiringForm] = useState(false);

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      const imageUrl = await generateHeroImage();
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/bniladridas',
      color: 'hover:text-purple-400'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/bniladridas',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Bluesky',
      icon: Cloud,
      url: 'https://bsky.app/profile/bniladridas.bsky.social',
      color: 'hover:text-sky-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/bniladridas',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Docker Hub',
      icon: Ship,
      url: 'https://hub.docker.com/u/bniladridas',
      color: 'hover:text-blue-300'
    },
    {
      name: 'HuggingFace',
      icon: BookOpen,
      url: 'https://huggingface.co/bniladridas',
      color: 'hover:text-yellow-400'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:bniladridas@gmail.com',
      color: 'hover:text-red-400'
    },
    {
      name: 'RubyGems',
      icon: Code2,
      url: 'https://rubygems.org/profiles/bniladridas',
      color: 'hover:text-red-500'
    }
  ];

  const navigationButtons = {
    internal: [
      { 
        label: 'Get Started', 
        icon: ChevronRight, 
        color: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700', 
        action: () => navigate('/learn'),
        primary: true
      },
      { 
        label: 'Hardware Check', 
        icon: Cpu, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        action: () => {
          const element = document.getElementById('system-requirements');
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      { 
        label: 'Research', 
        icon: Search, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        action: () => navigate('/research')
      },
      { 
        label: 'API Lab', 
        icon: Server, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        action: () => navigate('/test')
      },
      { 
        label: 'AI Art', 
        icon: Image, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        action: () => navigate('/generate')
      },
      { 
        label: 'Docs', 
        icon: FileText, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        action: () => navigate('/document-analysis')
      },
      { 
        label: 'Services', 
        icon: Server, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        action: () => navigate('/microservices')
      },
      { 
        label: 'Market AI', 
        icon: TrendingUp, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        action: () => navigate('/stocks')
      }
    ],
    external: [
      { 
        label: 'Hook', 
        icon: Code2, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        url: 'https://hook-first.vercel.app'
      },
      { 
        label: 'Community', 
        icon: MessageSquare, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        url: 'https://synthara-developers-forum.vercel.app'
      },
      { 
        label: 'Math Lab', 
        icon: Brain, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        url: 'https://synthara-calculus-visualization.vercel.app/'
      },
      { 
        label: 'Math Art', 
        icon: Image, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        url: 'https://synthara-calculus-image-generator.vercel.app/'
      },
      { 
        label: 'Chat', 
        icon: MessageSquare, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        url: 'https://synthara-ai-chat.vercel.app'
      },
      { 
        label: 'Commit', 
        icon: Code2, 
        color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
        url: 'https://commit-synthara.vercel.app'
      }
    ]
  };

  const handleOpenCredits = () => {
    const modal = document.getElementById('credits-modal');
    if (modal) modal.showModal();
  };

  const handleCloseCredits = () => {
    const modal = document.getElementById('credits-modal');
    if (modal) modal.close();
  };

  const announcements = [
    {
      id: 'gemini-2-flash',
      icon: Image,
      badge: 'NEW',
      badgeColor: 'bg-blue-500/20 text-blue-300',
      title: 'Gemini 2.0 Flash Image Generation',
      description: 'Experience native image generation with our experimental model',
      gradientFrom: 'purple-600/20',
      gradientVia: 'blue-600/20',
      gradientTo: 'purple-600/20',
      iconColor: 'text-blue-400',
      buttonGradient: 'from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600',
      buttonText: 'Try Now',
      buttonIcon: Image,
      action: () => navigate('/generate')
    },
    {
      id: 'gemini-2-5-pro',
      icon: Brain,
      badge: 'NEW',
      badgeColor: 'bg-indigo-500/20 text-indigo-300',
      title: 'Gemini 2.5 Pro Research',
      description: 'Enhanced context window with 65,536 tokens and advanced reasoning',
      gradientFrom: 'indigo-600/20',
      gradientVia: 'violet-600/20',
      gradientTo: 'indigo-600/20',
      iconColor: 'text-indigo-400',
      buttonGradient: 'from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600',
      buttonText: 'Try Now',
      buttonIcon: Search,
      action: () => navigate('/research')
    }
  ];

  const renderAnnouncement = (announcement: any) => (
    <motion.div
      key={announcement.id}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="mb-4 relative group"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r from-${announcement.gradientFrom} via-${announcement.gradientVia} to-${announcement.gradientTo} blur-xl`}
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-white/20"
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`absolute inset-0 bg-${announcement.iconColor.split('-')[1]}-500 blur-lg opacity-20`} />
              <motion.div
                className={`relative p-3 rounded-xl bg-gradient-to-br from-${announcement.gradientFrom.split('/')[0]} to-${announcement.gradientVia.split('/')[0]} border border-white/10`}
                whileHover={{
                  boxShadow: `0 0 20px ${announcement.iconColor.includes('blue') ? '#60A5FA' : '#818CF8'}`
                }}
              >
                <announcement.icon className={`w-6 h-6 ${announcement.iconColor}`} />
              </motion.div>
            </motion.div>
            
            <div>
              <div className="flex items-center gap-2">
                <motion.span
                  className={`px-2 py-1 rounded-md ${announcement.badgeColor} text-xs font-medium`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {announcement.badge}
                </motion.span>
                <motion.h3
                  className="text-lg font-semibold text-white"
                  whileHover={{ x: 5 }}
                >
                  {announcement.title}
                </motion.h3>
              </div>
              <motion.p
                className="text-gray-400 mt-1"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, color: "#fff" }}
              >
                {announcement.description}
              </motion.p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              onClick={announcement.action}
              className="relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
            >
              {/* Multiple geometric instances */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                {/* Instance 1 - Rotating hexagons */}
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={`hex-${i}`} 
                    className="absolute inset-0" 
                    style={{
                      transform: `rotate(${i * 30}deg) scale(${1.2 - i * 0.05})`,
                      animation: `spin-${i} ${8 + i * 2}s linear infinite`
                    }}
                  >
                    <div className={`
                      w-full h-full 
                      bg-gradient-to-r from-purple-600/20 to-blue-600/20 
                      clip-hexagon
                    `} />
                  </div>
                ))}

                {/* Instance 2 - Floating triangles */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`tri-${i}`}
                    className="absolute w-4 h-4 clip-triangle"
                    style={{
                      top: `${20 + i * 10}%`,
                      left: `${10 + i * 15}%`,
                      animation: `float-${i} ${3 + i}s ease-in-out infinite`,
                      opacity: 0.2,
                      background: i % 2 ? 'linear-gradient(to right, #9333ea, #2563eb)' : 'linear-gradient(to right, #2563eb, #9333ea)'
                    }}
                  />
                ))}

                {/* Instance 3 - Orbiting dots */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`dot-${i}`}
                      className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
                      style={{
                        transform: `rotate(${i * 45}deg) translateX(${100}%)`,
                        animation: `orbit ${5 + i * 0.5}s linear infinite`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Main button content */}
              <div className="
                relative px-6 py-3
                backdrop-blur-xl
                overflow-hidden
                clip-hexagon
                border border-white/10
                bg-black/30
                group-hover:bg-black/40
                transition-colors duration-300
              ">
                {/* Animated gradient lines */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={`line-${i}`}
                      className="absolute w-full h-[1px]"
                      style={{
                        top: `${30 + i * 20}%`,
                        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)',
                        transform: `translateX(-100%) rotate(${-15 + i * 15}deg)`,
                        animation: `slide-right ${3 + i}s linear infinite`
                      }}
                    />
                  ))}
                </div>

                {/* Instance 4 - Particle system */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={`particle-${i}`}
                      className="absolute w-1 h-1 rounded-full bg-white/20"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `particle-fade ${2 + Math.random() * 3}s linear infinite`
                      }}
                    />
                  ))}
                </div>

                {/* Button content */}
                <div className="relative flex items-center gap-3 z-10">
                  <announcement.buttonIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  <span className="font-medium bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                    {announcement.buttonText}
                  </span>
                </div>
              </div>

              {/* Outer glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-blue-600/20 to-purple-600/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 clip-hexagon" />
            </motion.button>

            <motion.button
              onClick={() => setShowBanner(false)}
              className="text-gray-400 hover:text-gray-300 p-2 rounded-full relative z-10"
              whileHover={{ 
                scale: 1.1,
                rotate: 90 
              }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black relative overflow-hidden">
      <GlobalStyles />
      {/* Background Visualizations */}
      <ParticleBackground />
      <AnimatedGrid />
      <FloatingTechStack />

      <div className="container mx-auto px-4 py-16 relative">
        {/* Company Logo Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <motion.div 
            className="relative w-32 h-32"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Flame effect layers */}
            <div className="absolute inset-0 animate-flame-spread">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-red-500 to-yellow-300 rounded-full blur-xl opacity-0 animate-flame-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-red-600 via-orange-400 to-yellow-200 rounded-full blur-lg opacity-0 animate-flame-pulse-delay" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-full blur-md opacity-0 animate-flame-pulse-slow" />
            </div>
            
            {/* Original glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-50" />
            
            {/* Logo image */}
            <img 
              src="https://avatars.githubusercontent.com/u/203538727?s=200&v=4"
              alt="Synthara Logo"
              className="relative w-full h-full object-contain rounded-full border-2 border-white/20"
            />
          </motion.div>
        </motion.div>

        {/* Technology Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <TechnologyVisualization />
        </motion.div>

        {/* Main Content */}
        <div className="mb-12 space-y-6">
          <AnimatedTitle />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your interactive guide to mastering machine learning concepts. Built with practical implementation experience and industry best practices.
          </p>
        </div>

        {/* Interactive Tech Web */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <InteractiveTechWeb />
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {navigationButtons.internal.map((button, index) => (
            <Button
              key={index}
              onClick={button.action}
              className={`
                w-full relative group overflow-hidden
                ${button.primary 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white' 
                  : `${button.color} hover:bg-white/15`}
                transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10
                border border-white/10 hover:border-white/20
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-white/5 to-purple-500/0 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative flex items-center justify-center gap-2">
                <button.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{button.label}</span>
              </div>
            </Button>
          ))}
        </motion.div>

        {/* External Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {navigationButtons.external.map((button, index) => (
            <Button
              key={index}
              onClick={() => window.open(button.url, '_blank')}
              className={`
                w-full relative group overflow-hidden
                ${button.color} hover:bg-white/15
                transition-all duration-300
                border border-white/10 hover:border-white/20
                flex items-center justify-center gap-2
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-white/5 to-purple-500/0 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative flex items-center justify-center gap-2">
                <button.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{button.label}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 
                                      translate-x-[-10px] group-hover:translate-x-0 
                                      transition-all duration-300" />
              </div>
            </Button>
          ))}
        </div>

        {/* Generated Image Container */}
        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl opacity-30" 
              />
              <img
                src={generatedImage}
                alt="AI Generated Art"
                className="relative rounded-3xl border border-white/20 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            <p className="text-center text-sm text-blue-300/70 mt-4 font-light">
              AI Generated Visualization
            </p>
          </motion.div>
        )}

        <CreditsModal onClose={handleCloseCredits} />
        <CompanySection />

        {/* System Requirements */}
        <div className="mt-16" id="system-requirements">
          <SystemRequirementsChecker />
        </div>
      </div>
      
      {showHiringForm && (
        <HiringForm 
          isOpen={showHiringForm} 
          onClose={() => {
            console.log('Closing hiring form');
            setShowHiringForm(false);
          }} 
        />
      )}
      <PopularModelsSection />
      <PoweredBySection />
    </div>
  );
}
