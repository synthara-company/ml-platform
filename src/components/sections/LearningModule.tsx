import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../ui/button';
import { CopyButton } from '../ui/CopyButton';
import { getAIExplanation, getAICodeExample } from '@/lib/ai';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface LearningModuleProps {
  topic: string;
  concept: string;
}

export function LearningModule({ topic, concept }: LearningModuleProps) {
  const [explanation, setExplanation] = useState('');
  const [codeExample, setCodeExample] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadContent() {
      try {
        setLoading(true);
        setError(null);
        
        const explanationText = await getAIExplanation(topic, concept);
        if (!mounted) return;
        setExplanation(explanationText.text);

        try {
          const codeText = await getAICodeExample(concept);
          if (!mounted) return;
          setCodeExample(codeText.text);
        } catch (error) {
          console.warn('Code example failed to load:', error);
        }
      } catch (error) {
        if (!mounted) return;
        console.error('Error loading content:', error);
        setError('Failed to load content. Please try again.');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      mounted = false;
    };
  }, [topic, concept]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Retry
        </Button>
      </div>
    );
  }

  const markdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="relative group my-6">
          <pre className="rounded-lg bg-[#1e1e1e] p-6 overflow-x-auto border border-gray-700">
            <code
              className={`${className} block text-base font-mono leading-relaxed`}
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </code>
          </pre>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <CopyButton content={String(children)} />
          </div>
        </div>
      ) : (
        <code className="bg-[#1e1e1e] rounded-md px-2 py-1 text-base font-mono text-blue-300" {...props}>
          {children}
        </code>
      );
    },
    h2: (props) => (
      <h2 
        {...props} 
        className="text-3xl font-bold mt-10 mb-6 text-white border-b-2 border-gray-700 pb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
      />
    ),
    h3: (props) => (
      <h3 
        {...props} 
        className="text-2xl font-bold mt-8 mb-4 text-blue-400"
      />
    ),
    h4: (props) => (
      <h4 
        {...props} 
        className="text-xl font-semibold mt-6 mb-3 text-blue-300"
      />
    ),
    blockquote: (props) => (
      <blockquote 
        {...props} 
        className="border-l-4 border-blue-500 bg-[#1e1e1e] pl-6 py-4 my-6 text-gray-300 rounded-lg text-lg italic"
      />
    ),
    ul: (props) => (
      <ul {...props} className="list-disc list-outside ml-6 my-6 space-y-3 text-gray-200 text-lg" />
    ),
    ol: (props) => (
      <ol {...props} className="list-decimal list-outside ml-6 my-6 space-y-3 text-gray-200 text-lg" />
    ),
    li: (props) => (
      <li {...props} className="pl-2 leading-relaxed" />
    ),
    p: (props) => (
      <p {...props} className="my-6 leading-relaxed text-lg text-gray-200" />
    ),
    a: (props) => (
      <a 
        {...props} 
        className="text-blue-400 hover:text-blue-300 font-medium underline decoration-2 decoration-blue-400/30 hover:decoration-blue-300/50 transition-all" 
        target="_blank" 
        rel="noopener noreferrer" 
      />
    ),
    img: (props) => (
      <img
        {...props}
        className="rounded-lg shadow-xl max-w-full my-8 border border-gray-700"
        loading="lazy"
      />
    ),
    table: (props) => (
      <div className="overflow-x-auto my-8 rounded-lg border border-gray-700">
        <table {...props} className="min-w-full divide-y divide-gray-700 bg-[#1c2128]" />
      </div>
    ),
    th: (props) => (
      <th {...props} className="px-6 py-4 bg-[#1e1e1e] text-left text-sm font-semibold text-gray-200 uppercase tracking-wider" />
    ),
    td: (props) => (
      <td {...props} className="px-6 py-4 border-t border-gray-700 text-gray-300 text-base" />
    ),
  };

  return (
    <div className="space-y-8">
      {explanation && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1c2128] border border-[#30363d] rounded-lg p-8 shadow-xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Explanation
            </h2>
            <CopyButton content={explanation} />
          </div>
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={markdownComponents}
            >
              {explanation}
            </ReactMarkdown>
          </div>
        </motion.section>
      )}

      {codeExample && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1c2128] border border-[#30363d] rounded-lg p-8 shadow-xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Code Example
            </h2>
            <CopyButton content={codeExample} />
          </div>
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={markdownComponents}
            >
              {codeExample}
            </ReactMarkdown>
          </div>
        </motion.section>
      )}
    </div>
  );
}
