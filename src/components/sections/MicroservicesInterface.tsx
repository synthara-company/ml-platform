import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Server, Database, Cloud, Network, Code2, 
  GitBranch, Lock, Globe, MessageSquare, Container,
  Brain, Cpu, Search, Microscope, Image as ImageIcon,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../ui/button';
import { getAIExplanation, type AIResponse } from '@/lib/ai';
import ReactMarkdown from 'react-markdown';

const topics = [
  {
    id: 'basics',
    title: 'Microservices Fundamentals',
    icon: Server,
    content: 'Understanding the core concepts of microservices architecture.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    concepts: ['What are Microservices?', 'Monolithic vs Microservices', 'Benefits and Challenges']
  },
  {
    id: 'patterns',
    title: 'Design Patterns',
    icon: Code2,
    content: 'Essential patterns for building robust microservices.',
    image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    concepts: ['API Gateway', 'Service Discovery', 'Circuit Breaker']
  },
  {
    id: 'communication',
    title: 'Service Communication',
    icon: Network,
    content: 'Inter-service communication patterns and protocols.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    concepts: ['REST vs gRPC', 'Event-Driven Architecture', 'Message Queues']
  },
  {
    id: 'deployment',
    title: 'Container Orchestration',
    icon: Container,
    content: 'Deploying and managing microservices with containers.',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    concepts: ['Docker Containers', 'Kubernetes Basics', 'Service Mesh']
  },
  {
    id: 'ai-services',
    title: 'AI/ML Services',
    icon: Brain,
    content: 'Specialized AI and ML microservices for scientific computing.',
    image: 'https://images.unsplash.com/photo-1677442136019-21c1f4b1ec0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    concepts: ['ColabFold MSA Search', 'Protein Structure Prediction', 'Sequence Analysis']
  },
  {
    id: 'nvidia-integration',
    title: 'NVIDIA Integration',
    icon: Cpu,
    content: 'NVIDIA-powered computational biology services.',
    image: 'https://images.unsplash.com/photo-1635241161466-541f065683ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    concepts: ['NVIDIA NGC Platform', 'GPU Acceleration', 'Containerized Workflows']
  },
  {
    id: 'bioinformatics',
    title: 'Bioinformatics Tools',
    icon: Microscope,
    content: 'Specialized tools for biological data analysis.',
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    concepts: ['Sequence Alignment', 'Structure Prediction', 'Data Visualization']
  },
  {
    id: 'protein-structure',
    title: 'Protein Structure Prediction',
    icon: Brain,
    content: 'Advanced protein structure prediction and analysis services.',
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    concepts: ['AlphaFold2', 'AlphaFold2 Multimer', 'OpenFold2', 'ESM2-650M']
  },
  {
    id: 'molecular-design',
    title: 'Molecular Design',
    icon: Microscope,
    content: 'AI-powered molecular generation and optimization services.',
    image: 'https://images.unsplash.com/photo-1677442136019-21c1f4b1ec0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    concepts: ['GenMol Generate', 'MolMIM Generate', 'DiffDock', 'RFDiffusion']
  },
  {
    id: 'protein-engineering',
    title: 'Protein Engineering',
    icon: Cpu,
    content: 'Tools for protein sequence design and engineering.',
    image: 'https://images.unsplash.com/photo-1635241161466-541f065683ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    concepts: ['ProteinMPNN', 'EVO-2-40B', 'ColabFold MSA Search']
  },
  {
    id: 'image-generation',
    title: 'Image Generation',
    icon: ImageIcon,
    content: 'Advanced AI-powered image generation services.',
    image: 'https://images.unsplash.com/photo-1677442136019-21c1f4b1ec0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    concepts: ['Stable Diffusion XL', 'DALL-E 3', 'Midjourney API', 'ControlNet']
  }
];

const serviceDetails = {
  'AlphaFold2': {
    title: 'AlphaFold2',
    description: 'DeepMind\'s revolutionary protein structure prediction system that achieves unparalleled accuracy in predicting 3D protein structures from amino acid sequences.',
    url: 'https://build.nvidia.com/deepmind/alphafold2',
    features: [
      'High-accuracy protein structure prediction',
      'GPU-accelerated inference',
      'Support for various protein lengths',
      'Confidence score prediction',
      'Multiple sequence alignment integration'
    ],
    apiEndpoint: '/api/v1/alphafold2',
    techStack: [
      'JAX',
      'CUDA Toolkit',
      'TensorFlow',
      'Docker Container',
      'Python API'
    ]
  },
  'AlphaFold2 Multimer': {
    title: 'AlphaFold2 Multimer',
    description: 'Extended version of AlphaFold2 specifically designed for predicting protein complex structures and multi-chain assemblies.',
    url: 'https://build.nvidia.com/deepmind/alphafold2-multimer',
    features: [
      'Multi-chain protein complex prediction',
      'Interaction interface prediction',
      'Quaternary structure modeling',
      'Heteromeric complex support',
      'Advanced scoring system'
    ],
    apiEndpoint: '/api/v1/alphafold2-multimer',
    techStack: [
      'JAX',
      'CUDA Toolkit',
      'TensorFlow',
      'Docker Container',
      'Python API'
    ]
  },
  'OpenFold2': {
    title: 'OpenFold2',
    description: 'Open-source implementation of protein structure prediction with enhanced performance and additional features.',
    url: 'https://build.nvidia.com/openfold/openfold2',
    features: [
      'Optimized performance',
      'Extended model capabilities',
      'Custom training support',
      'Flexible deployment options',
      'Community-driven development'
    ],
    apiEndpoint: '/api/v1/openfold2',
    techStack: [
      'PyTorch',
      'CUDA Toolkit',
      'Docker Container',
      'Python API',
      'FastAPI Backend'
    ]
  },
  'ESM2-650M': {
    title: 'ESM2-650M Language Model',
    description: 'Meta\'s advanced protein language model for understanding protein sequences and their properties.',
    url: 'https://build.nvidia.com/meta/esm2-650m',
    features: [
      'Protein sequence embedding',
      'Property prediction',
      'Transfer learning support',
      'Zero-shot prediction',
      'Evolutionary scale modeling'
    ],
    apiEndpoint: '/api/v1/esm2',
    techStack: [
      'PyTorch',
      'Transformers',
      'CUDA Toolkit',
      'Docker Container',
      'REST API'
    ]
  },
  'GenMol Generate': {
    title: 'GenMol Generate',
    description: 'NVIDIA\'s generative model for molecular design and optimization.',
    url: 'https://build.nvidia.com/nvidia/genmol-generate',
    features: [
      'De novo molecule generation',
      'Property-guided design',
      'Multi-objective optimization',
      'SMILES string generation',
      'Batch processing support'
    ],
    apiEndpoint: '/api/v1/genmol',
    techStack: [
      'PyTorch',
      'RDKit',
      'CUDA Toolkit',
      'Docker Container',
      'REST API'
    ]
  },
  'MolMIM Generate': {
    title: 'MolMIM Generate',
    description: 'Advanced molecular generation service using masked inverse modeling.',
    url: 'https://build.nvidia.com/nvidia/molmim-generate',
    features: [
      'Structure-based generation',
      'Fragment-based design',
      'Conditional generation',
      '3D conformer prediction',
      'Property prediction'
    ],
    apiEndpoint: '/api/v1/molmim',
    techStack: [
      'PyTorch',
      'RDKit',
      'CUDA Toolkit',
      'Docker Container',
      'GraphQL API'
    ]
  },
  'DiffDock': {
    title: 'DiffDock',
    description: 'MIT\'s diffusion-based protein-ligand docking platform.',
    url: 'https://build.nvidia.com/mit/diffdock',
    features: [
      'Protein-ligand docking',
      'Binding site prediction',
      'Pose generation',
      'Scoring function',
      'Batch processing'
    ],
    apiEndpoint: '/api/v1/diffdock',
    techStack: [
      'PyTorch',
      'OpenMM',
      'CUDA Toolkit',
      'Docker Container',
      'REST API'
    ]
  },
  'ProteinMPNN': {
    title: 'ProteinMPNN',
    description: 'Advanced protein sequence design tool using message passing neural networks.',
    url: 'https://build.nvidia.com/ipd/proteinmpnn',
    features: [
      'Sequence design',
      'Structure-based prediction',
      'Multi-state design',
      'Flexibility prediction',
      'Design optimization'
    ],
    apiEndpoint: '/api/v1/proteinmpnn',
    techStack: [
      'PyTorch',
      'CUDA Toolkit',
      'Docker Container',
      'Python API',
      'REST API'
    ]
  },
  'EVO-2-40B': {
    title: 'EVO-2-40B',
    description: 'Large-scale protein language model for evolutionary sequence analysis.',
    url: 'https://build.nvidia.com/arc/evo2-40b',
    features: [
      'Evolutionary analysis',
      'Sequence prediction',
      'Mutation effect prediction',
      'Protein family analysis',
      'Large-scale inference'
    ],
    apiEndpoint: '/api/v1/evo2',
    techStack: [
      'PyTorch',
      'Transformers',
      'CUDA Toolkit',
      'Docker Container',
      'REST API'
    ]
  },
  'RFDiffusion': {
    title: 'RFDiffusion',
    description: 'Protein structure generation using diffusion models.',
    url: 'https://build.nvidia.com/ipd/rfdiffusion',
    features: [
      'De novo structure generation',
      'Scaffold-based design',
      'Motif-based generation',
      'Conformational sampling',
      'Structure optimization'
    ],
    apiEndpoint: '/api/v1/rfdiffusion',
    techStack: [
      'PyTorch',
      'JAX',
      'CUDA Toolkit',
      'Docker Container',
      'REST API'
    ]
  },
  'Stable Diffusion XL': {
    title: 'Stable Diffusion XL',
    description: 'State-of-the-art text-to-image generation model with enhanced quality and control.',
    url: 'https://build.nvidia.com/stability/sdxl',
    features: [
      'High-resolution image generation',
      'Advanced prompt processing',
      'Style control and consistency',
      'Negative prompting',
      'Multi-prompt synthesis'
    ],
    apiEndpoint: '/api/v1/sdxl',
    techStack: [
      'PyTorch',
      'CUDA Toolkit',
      'Docker Container',
      'REST API',
      'Python Backend'
    ]
  },
  'DALL-E 3': {
    title: 'DALL-E 3',
    description: 'OpenAI\'s latest text-to-image model with unprecedented understanding and quality.',
    url: 'https://build.nvidia.com/openai/dalle3',
    features: [
      'Photorealistic image generation',
      'Complex scene composition',
      'Artistic style control',
      'High coherence and accuracy',
      'Multi-subject scenes'
    ],
    apiEndpoint: '/api/v1/dalle3',
    techStack: [
      'Custom Runtime',
      'CUDA Toolkit',
      'Docker Container',
      'REST API',
      'FastAPI Backend'
    ]
  },
  'Midjourney API': {
    title: 'Midjourney API',
    description: 'API access to Midjourney\'s artistic image generation capabilities.',
    url: 'https://build.nvidia.com/midjourney/api',
    features: [
      'Artistic style generation',
      'Style mixing and matching',
      'Resolution upscaling',
      'Variation generation',
      'Batch processing'
    ],
    apiEndpoint: '/api/v1/midjourney',
    techStack: [
      'Custom Runtime',
      'CUDA Toolkit',
      'Docker Container',
      'GraphQL API',
      'Node.js Backend'
    ]
  },
  'ControlNet': {
    title: 'ControlNet',
    description: 'Advanced control mechanisms for guided image generation.',
    url: 'https://build.nvidia.com/stability/controlnet',
    features: [
      'Pose-guided generation',
      'Edge detection control',
      'Depth map integration',
      'Segmentation masks',
      'Multi-condition synthesis'
    ],
    apiEndpoint: '/api/v1/controlnet',
    techStack: [
      'PyTorch',
      'CUDA Toolkit',
      'Docker Container',
      'REST API',
      'Python Backend'
    ]
  }
};

export function MicroservicesInterface() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConceptClick = async (topic: string, concept: string) => {
    setLoading(true);
    setSelectedTopic(topic);
    setSelectedConcept(concept);
    
    try {
      const response = await getAIExplanation('Microservices', concept);
      setExplanation(response);
    } catch (error) {
      console.error('Error fetching explanation:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderServiceDetails = (serviceName: string) => {
    const details = serviceDetails[serviceName as keyof typeof serviceDetails];
    if (!details) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
            <Brain className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {details.title}
            </h4>
            <p className="text-gray-400 mt-1">{details.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Features Section */}
          <div className="bg-surface/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h5 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Key Features
            </h5>
            <ul className="space-y-3">
              {details.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Section */}
          <div className="bg-surface/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
            <h5 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              Tech Stack
            </h5>
            <div className="grid grid-cols-2 gap-3">
              {details.techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/5 p-3 rounded-lg text-gray-300"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <a 
            href={details.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg
                     text-white font-medium hover:opacity-90 transition-opacity"
          >
            <Globe className="w-5 h-5" />
            Access Service
          </a>
          <a 
            href={details.apiEndpoint}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-purple-500/20 rounded-lg
                     text-gray-300 font-medium hover:bg-white/10 transition-colors"
          >
            <Code2 className="w-5 h-5" />
            API Documentation
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Back Button */}
      <Button
        onClick={() => navigate('/')}
        variant="ghost"
        className="text-gray-400 hover:text-white flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Button>

      {/* Header Section */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative px-8 py-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Explore Our Microservices Architecture
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our comprehensive suite of microservices, from core infrastructure to cutting-edge AI capabilities. 
            Select any topic to learn more about specific services and implementations.
          </p>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {topics.map((topic) => (
          <motion.div
            key={topic.id}
            whileHover={{ scale: 1.02 }}
            className="group bg-surface/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 
                     hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg
                            group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
                <topic.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                {topic.title}
              </h2>
            </div>
            
            <p className="text-gray-400 mb-4">{topic.content}</p>
            
            <div className="space-y-2">
              {topic.concepts.map((concept) => (
                <button
                  key={concept}
                  onClick={() => handleConceptClick(topic.title, concept)}
                  className="w-full text-left px-4 py-2 rounded-lg text-gray-300
                           hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  {concept}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Service Details Section */}
      {selectedConcept && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-surface/30 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3 text-gray-400 py-12">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              Loading explanation...
            </div>
          ) : (
            <>
              {renderServiceDetails(selectedConcept)}
              <div className="prose prose-invert max-w-none mt-8">
                <ReactMarkdown>{explanation?.text || ''}</ReactMarkdown>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
