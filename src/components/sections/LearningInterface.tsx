import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';
import { 
  Brain, BookOpen, Database, Code, BarChart, 
  Rocket, ArrowLeft, Cpu, Settings, Sparkles, 
  ChevronRight, Blocks, Network, Search, Lock, Command 
} from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { LearningModule } from './LearningModule';
import { AIProviderSwitch } from '../AIProviderSwitch';
import { BackendVisualization } from './BackendVisualization';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Search,
    title: "Content Discovery",
    description: "Analyzing learning request",
    color: "text-blue-400"
  },
  {
    icon: Brain,
    title: "AI Model Selection",
    description: "Selecting optimal teaching model",
    color: "text-purple-400"
  },
  {
    icon: Database,
    title: "Knowledge Base Access",
    description: "Accessing relevant information",
    color: "text-green-400"
  },
  {
    icon: Cpu,
    title: "Content Processing",
    description: "Structuring educational content",
    color: "text-amber-400"
  },
  {
    icon: Sparkles,
    title: "Response Generation",
    description: "Creating personalized explanation",
    color: "text-pink-400"
  }
];

const topics = [
  {
    id: 'intro',
    title: 'Introduction to ML',
    icon: Brain,
    content: 'Learn the fundamentals of Machine Learning and its applications.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['What is Machine Learning?', 'Types of Machine Learning', 'Common Applications']
  },
  {
    id: 'math',
    title: 'Mathematics Behind ML',
    icon: BookOpen,
    content: 'Master the essential mathematical concepts driving ML algorithms.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['Linear Algebra Basics', 'Probability Theory', 'Calculus for ML']
  },
  {
    id: 'preprocessing',
    title: 'Data Preprocessing',
    icon: Database,
    content: 'Learn how to prepare and clean data for ML models.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['Data Cleaning', 'Feature Engineering', 'Data Normalization']
  },
  {
    id: 'model',
    title: 'Model Building',
    icon: Code,
    content: 'Build ML models from scratch with step-by-step guidance.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['Linear Regression', 'Decision Trees', 'Neural Networks']
  },
  {
    id: 'training',
    title: 'Training & Evaluation',
    icon: BarChart,
    content: 'Master model training techniques and performance metrics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['Model Training Process', 'Evaluation Metrics', 'Cross-validation']
  },
  {
    id: 'deployment',
    title: 'Model Deployment',
    icon: Rocket,
    content: 'Learn how to deploy ML models to production environments.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['Model Serialization', 'API Development', 'Cloud Deployment']
  }
];

export function LearningInterface() {
  const navigate = useNavigate();
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [learningContent, setLearningContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConceptSelect = async (concept: string) => {
    if (loading) return;
    
    setSelectedConcept(concept);
    setLoading(true);
    setError(null);
    setLearningContent(null);
    
    try {
      // Step 1: Content Discovery
      setCurrentStep(0);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 2: AI Model Selection
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 3: Knowledge Base Access
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 4: Content Processing
      setCurrentStep(3);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 5: Response Generation - Hold until response is ready
      setCurrentStep(4);
      
      // Make the actual API call
      const response = await getAIExplanation(activeTopic.title, concept);
      
      if (!response || !response.text) {
        throw new Error('Invalid response from AI service');
      }

      // Format and set the learning content
      const formattedContent = `
## ${concept}

${response.text}

---
*Topic: ${activeTopic.title}*
      `;

      setLearningContent(formattedContent);
      
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      // Show completion state briefly before closing
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
      setCurrentStep(0);
    }
  };

  // Process Visualization component
  const ProcessVisualization = () => (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
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
                    x: isActive ? 10 : 0,
                    scale: isActive ? 1.02 : 1
                  }}
                >
                  <div className={`p-2 rounded-lg ${step.color} bg-white/5 relative`}>
                    <Icon size={24} />
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          background: `radial-gradient(circle, ${step.color.replace('text-', '')}, transparent)`,
                          filter: 'blur(4px)'
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                  {isActive && (
                    <motion.div 
                      className="ml-auto flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className={`w-8 h-8 rounded-full border-2 ${step.color.replace('text-', 'border-')}`}
                        style={{
                          borderRightColor: 'transparent',
                          borderBottomColor: 'transparent'
                        }}
                        animate={{
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 1,
                          ease: "linear",
                          repeat: Infinity
                        }}
                      />
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

  // Add this component for the response loading state
  const ResponseLoadingIndicator = () => (
    <motion.div 
      className="flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-10 h-10 rounded-full border-4 border-purple-500"
        style={{
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent'
        }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity
        }}
      />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Enhanced animated background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Neural network grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:30px_30px] animate-[gradient_4s_linear_infinite] opacity-20" />
        
        {/* Enhanced radial gradient pulse */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(68,68,68,0.3),transparent_70%)] animate-pulse" />
        
        {/* Dynamic circuit patterns */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm13.312 0l8.485 8.485-1.414 1.414-7.9-7.9h.828zm-9.9 0l7.9 7.9-1.415 1.415-7.9-7.9h1.414zm6.485 0l4.95 4.95-1.414 1.414-3.536-3.536L26.8 0h2.83zm-3.657 0l3.536 3.536-1.414 1.414L22.343 0h2.828z' fill='rgba(68, 68, 68, 0.2)' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          opacity: 0.3,
          animation: 'circuitFlow 20s linear infinite'
        }} />
        
        {/* Floating orbs with enhanced glow */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px] animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] animate-[pulse_5s_ease-in-out_infinite]" />
        
        {/* Data stream effects */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`stream-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
              style={{
                top: `${10 + i * 10}%`,
                left: '-100%',
                width: '100%',
                animation: `dataStream ${3 + i * 0.5}s linear infinite`,
                transform: `rotate(${i * 5}deg)`
              }}
            />
          ))}
        </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            {/* Add Processing Steps Visualization */}
            <ProcessVisualization />

            {/* Enhanced AI Model Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl p-8 shadow-2xl border border-white/10 relative overflow-hidden"
            >
              {/* Decorative background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl" />
              </div>

              <div className="flex items-start gap-8 relative z-10">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
                    <div className="relative z-10 p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-white/10">
                      <Cpu className="w-12 h-12 text-purple-400" />
                    </div>
                  </div>
                </div>
                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-text-primary flex items-center gap-3">
                    Gemini 2.5
                      <span className="text-purple-400">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                      </span>
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-2">
                      Your AI-powered coding companion, built for developers who value clean code and rapid feedback.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tech Specs Card */}
                    <div className="space-y-3 bg-black/30 p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 group">
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        <Settings className="w-4 h-4 text-purple-400 group-hover:rotate-90 transition-transform duration-500" />
                        Tech Specs
                      </h4>
                      <ul className="space-y-3">
                        {[
                          'Temperature: 1.0 for creative responses',
                          'Top-P: 0.95 for diverse outputs',
                          'Top-K: 64 for broader sampling',
                          '65,536 max output tokens',
                          'Advanced context understanding'
                        ].map((spec, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="text-purple-400">→</span>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Features Card */}
                    <div className="space-y-3 bg-black/30 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 group">
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        <Blocks className="w-4 h-4 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
                        Features
                      </h4>
                      <ul className="space-y-3">
                        {[
                          'Real-time code analysis',
                          'Context-aware suggestions',
                          'Multi-language support'
                        ].map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="text-blue-400">→</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Topics Navigation */}
            <Tabs.Root 
              defaultValue="intro"
              className="space-y-8"
              onValueChange={(value) => {
                setActiveTopic(topics.find(t => t.id === value) || topics[0]);
                setSelectedConcept(null);
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Tabs.List className="flex flex-wrap gap-3 p-1 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
                  {topics.map((topic) => (
                    <Tabs.Trigger
                      key={topic.id}
                      value={topic.id}
                      className="group flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-300 data-[state=active]:bg-white/10 data-[state=active]:text-purple-400"
                    >
                      <topic.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{topic.title}</span>
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </motion.div>

              {/* Content Area */}
              {topics.map((topic) => (
                <Tabs.Content
                  key={topic.id}
                  value={topic.id}
                  className="focus:outline-none"
                >
                  {!selectedConcept ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-text-primary">
                          {topic.title}
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                          {topic.content}
                        </p>
                        <div className="grid gap-3">
                          {topic.concepts.map((concept) => (
                            <Button 
                              key={concept}
                              onClick={() => handleConceptSelect(concept)}
                              className="w-full justify-start bg-black/30 hover:bg-black/50 border border-white/10 hover:border-purple-500/30 text-left p-4 rounded-xl transition-all duration-300 group"
                            >
                              <ChevronRight className="mr-2 h-4 w-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                              {concept}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="relative h-[400px] rounded-2xl overflow-hidden group">
                        <img
                          src={topic.image}
                          alt={topic.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      </div>
                    </motion.div>
                  ) : (
                    <LearningModule 
                      topic={activeTopic.title} 
                      concept={selectedConcept} 
                    />
                  )}
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </div>

          {/* Backend visualization sidebar - Now always visible during loading */}
          <div className="lg:col-span-1 sticky top-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={loading ? 'animate-pulse' : ''}
            >
              <BackendVisualization />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
