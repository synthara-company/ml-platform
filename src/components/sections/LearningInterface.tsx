import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';
import { 
  Brain, BookOpen, Database, Code, BarChart, 
  Rocket, ArrowLeft, Cpu, Settings, Sparkles, 
  ChevronRight, Blocks, Network 
} from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { LearningModule } from './LearningModule';
import { AIProviderSwitch } from '../AIProviderSwitch';

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

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-text-primary">
      {/* Animated background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[gradient_3s_linear_infinite] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(68,68,68,0.2),transparent)] animate-pulse" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {/* Enhanced Header with glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 backdrop-blur-lg bg-white/5 p-4 rounded-xl border border-white/10 shadow-lg"
        >
          <Button
            variant="ghost"
            className="hover:bg-white/10 text-text-primary group transition-all duration-300"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
          <AIProviderSwitch />
        </motion.div>

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
                          onClick={() => setSelectedConcept(concept)}
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
    </div>
  );
}
