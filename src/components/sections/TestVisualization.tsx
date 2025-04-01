import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Server, Database, Network } from 'lucide-react';

interface TestVisualizationProps {
  className?: string;
  testType?: 'code' | 'explanation' | 'creative' | 'api';
  loading?: boolean;
}

export function TestVisualization({ className = '', testType, loading = false }: TestVisualizationProps) {
  const nodes = [
    { id: 'input', label: 'Input', icon: Code },
    { id: 'process', label: 'Processing', icon: Brain },
    { id: 'api', label: 'API Layer', icon: Server },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'output', label: 'Output', icon: Network }
  ];

  const getNodeColor = (nodeId: string) => {
    switch (testType) {
      case 'code':
        return 'from-blue-500 to-blue-600';
      case 'explanation':
        return 'from-green-500 to-green-600';
      case 'creative':
        return 'from-purple-500 to-purple-600';
      case 'api':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className={`relative p-8 rounded-2xl bg-black/40 backdrop-blur-xl ${className}`}>
      {/* Animated background effects */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        {/* Hexagon Grid */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm13.312 0l8.485 8.485-1.414 1.414-7.9-7.9h.828zm-9.9 0l7.9 7.9-1.415 1.415-7.9-7.9h1.414zm6.485 0l4.95 4.95-1.414 1.414-3.536-3.536L26.8 0h2.83zm-3.657 0l3.536 3.536-1.414 1.414L22.343 0h2.828z' fill='rgba(255, 255, 255, 0.1)' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            animation: 'circuitFlow 20s linear infinite'
          }}
        />
        
        {/* Glowing lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute h-[1px] w-full"
            style={{
              top: `${20 + i * 15}%`,
              background: `linear-gradient(90deg, transparent, ${testType === 'code' ? '#60A5FA' : testType === 'explanation' ? '#34D399' : testType === 'creative' ? '#A78BFA' : '#F97316'}, transparent)`,
              opacity: 0.3,
              transform: `translateX(-50%) rotate(${i * 5}deg)`,
              animation: `dataStream ${3 + i}s linear infinite`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative group`}
          >
            {/* Node container */}
            <div className={`flex items-center gap-4 p-4 rounded-xl 
              bg-gradient-to-r ${getNodeColor(node.id)} bg-opacity-10 
              border border-white/10 backdrop-blur-sm
              ${loading ? 'animate-pulse' : ''}
              transition-all duration-300 hover:scale-[1.02]`}
            >
              {/* Icon container with glow effect */}
              <div className={`relative p-3 rounded-lg bg-gradient-to-br ${getNodeColor(node.id)}`}>
                <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <node.icon className="w-6 h-6 text-white relative z-10" />
              </div>

              <div className="flex-1">
                <h4 className="font-medium text-white">{node.label}</h4>
                <div className="h-1 mt-2 rounded-full bg-white/10 overflow-hidden">
                  {loading && (
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getNodeColor(node.id)}`}
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'linear',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Connecting line */}
            {index < nodes.length - 1 && (
              <div className="absolute left-7 bottom-0 w-[2px] h-6 bg-gradient-to-b from-white/20 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            background: testType === 'code' ? '#60A5FA' : testType === 'explanation' ? '#34D399' : testType === 'creative' ? '#A78BFA' : '#F97316',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.5,
            animation: `float ${Math.random() * 3 + 2}s linear infinite`
          }}
        />
      ))}
    </div>
  );
}
