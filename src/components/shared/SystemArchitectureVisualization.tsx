import React from 'react';
import { motion } from 'framer-motion';
import { BackendVisualization } from '@/components/sections/BackendVisualization';

interface SystemArchitectureVisualizationProps {
  className?: string;
  showAnimation?: boolean;
  animationType?: 'fade-up' | 'fade-side';
  loading?: boolean;
}

export function SystemArchitectureVisualization({
  className = '',
  showAnimation = true,
  animationType = 'fade-up',
  loading = false
}: SystemArchitectureVisualizationProps) {
  const getAnimationProps = () => {
    if (!showAnimation) return {};

    const animations = {
      'fade-up': {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      },
      'fade-side': {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
      }
    };

    return animations[animationType];
  };

  return (
    <motion.div
      {...getAnimationProps()}
      transition={{ delay: 0.3 }}
      className={`${loading ? 'animate-pulse' : ''} ${className}`}
    >
      <BackendVisualization />
    </motion.div>
  );
}