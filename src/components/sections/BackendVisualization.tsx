import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Server, ArrowRight, Cloud, Code, Cpu, Network, Lock } from 'lucide-react';

interface BackendNode {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  details?: string[];
}

const backendNodes: BackendNode[] = [
  {
    id: 'client',
    label: 'Client Layer',
    icon: Code,
    description: 'Frontend application interface',
    details: [
      'React components',
      'State management',
      'User interactions',
      'API integration'
    ]
  },
  {
    id: 'api',
    label: 'API Gateway',
    icon: Network,
    description: 'Request routing and authentication',
    details: [
      'Request validation',
      'Rate limiting',
      'Load balancing',
      'API versioning'
    ]
  },
  {
    id: 'auth',
    label: 'Auth Service',
    icon: Lock,
    description: 'Authentication and authorization',
    details: [
      'JWT handling',
      'OAuth integration',
      'Role management',
      'Session control'
    ]
  },
  {
    id: 'service',
    label: 'Service Layer',
    icon: Cloud,
    description: 'Business logic processing',
    details: [
      'Data processing',
      'Business rules',
      'Service orchestration',
      'Event handling'
    ]
  },
  {
    id: 'ml',
    label: 'ML Engine',
    icon: Cpu,
    description: 'Machine learning inference',
    details: [
      'Model inference',
      'Data preprocessing',
      'Result optimization',
      'Model versioning'
    ]
  },
  {
    id: 'database',
    label: 'Database Layer',
    icon: Database,
    description: 'Data persistence and retrieval',
    details: [
      'Data storage',
      'Query optimization',
      'Caching',
      'Backup management'
    ]
  }
];

export function BackendVisualization() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [activeNodes, setActiveNodes] = useState<string[]>([]);

  useEffect(() => {
    // Simulate data flow through the system
    const interval = setInterval(() => {
      const flow = ['client', 'api', 'auth', 'service', 'ml', 'database'];
      let currentIndex = 0;

      const flowInterval = setInterval(() => {
        if (currentIndex < flow.length) {
          setActiveNodes(prev => [...prev, flow[currentIndex]]);
          currentIndex++;
        } else {
          setActiveNodes([]);
          currentIndex = 0;
        }
      }, 1000);

      return () => clearInterval(flowInterval);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="backdrop-blur-xl bg-black/30 rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold mb-6 text-white">System Architecture</h3>
      
      <div className="flex flex-col gap-4">
        {backendNodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer
                ${selectedNode === node.id ? 'bg-white/10 border-purple-500/50' : 'bg-white/5 border-white/10'}
                ${activeNodes.includes(node.id) ? 'border-green-500/50' : ''}
                border hover:border-purple-500/30`}
              onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
            >
              <div className={`p-2 rounded-lg transition-colors
                ${selectedNode === node.id ? 'bg-purple-500/20' : 'bg-white/5'}
                ${activeNodes.includes(node.id) ? 'bg-green-500/20' : ''}`}
              >
                <node.icon className={`w-6 h-6 
                  ${selectedNode === node.id ? 'text-purple-400' : 'text-white'}
                  ${activeNodes.includes(node.id) ? 'text-green-400' : ''}`} 
                />
              </div>
              
              <div>
                <h4 className="font-medium text-white">{node.label}</h4>
                <p className="text-sm text-gray-400">{node.description}</p>
              </div>

              {index < backendNodes.length - 1 && (
                <motion.div
                  className={`absolute -bottom-4 left-7 h-4 w-0.5 
                    ${activeNodes.includes(node.id) ? 'bg-green-500/50' : 'bg-white/10'}`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                />
              )}
            </motion.div>

            <AnimatePresence>
              {selectedNode === node.id && node.details && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-14 bg-white/5 rounded-lg p-4"
                >
                  <ul className="space-y-2">
                    {node.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <ArrowRight className="w-4 h-4 text-purple-400" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
