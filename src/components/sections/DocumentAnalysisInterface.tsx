
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, FileText, Loader2, Brain, Command, 
  Timer, Sparkles, FileImage, FilePdf, FileCode, 
  Copy, Check, Download, Upload
} from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { AIProviderSwitch } from '../AIProviderSwitch';
import { analyzeDocument } from '../../lib/ai';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const SUPPORTED_FORMATS = {
  'image/png': '.png',
  'image/jpeg': '.jpg, .jpeg',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
  'text/plain': '.txt'
} as const;

// Add type checking for file types
const isValidFileType = (type: string): boolean => {
  return Object.keys(SUPPORTED_FORMATS).includes(type);
};

interface AnalysisResult {
  text: string;
  totalTokens: number;
  promptTokens: number;
  completionTokens: number;
  thoughts?: string;
}

interface AnalysisMode {
  type: 'general' | 'solve' | 'explain' | 'summarize';
  customPrompt?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function DocumentAnalysisInterface() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>({ type: 'general' });
  const [customInstructions, setCustomInstructions] = useState('');

  // Add markdown components configuration
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(String(children))}
              className="hover:bg-white/10"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <code className="bg-[#1e1e1e] rounded-md px-2 py-1 text-base font-mono text-blue-300" {...props}>
          {children}
        </code>
      );
    },
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File size exceeds 10MB limit');
      return;
    }

    const fileType = selectedFile.type;
    if (!Object.keys(SUPPORTED_FORMATS).includes(fileType)) {
      setError(`Unsupported file format: ${fileType}. Supported formats: ${Object.values(SUPPORTED_FORMATS).join(', ')}`);
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const handleAnalysis = async () => {
    if (!file || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeDocument(file, analysisMode, customInstructions);
      
      setResult({
        text: analysisResult.text,
        totalTokens: analysisResult.totalTokens,
        promptTokens: analysisResult.promptTokens,
        completionTokens: analysisResult.completionTokens,
        thoughts: analysisResult.thoughts,
        metadata: {
          fileType: file.type,
          wordCount: analysisResult.text.split(/\s+/).length,
          processedAt: new Date().toISOString()
        }
      });
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze document');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = async () => {
    if (!result?.text) return;
    
    try {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownloadText = () => {
    if (!result?.text) return;

    const blob = new Blob([result.text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `extracted-text-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0f1115] to-black text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[gradient_3s_linear_infinite] opacity-20" />
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
                  <FileText className="w-12 h-12 text-purple-400" />
                </div>
              </div>
            </div>
            <div className="space-y-6 flex-1">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                  Document Analysis
                  <span className="text-purple-400">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </span>
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-2">
                  Upload your documents for AI-powered analysis and extraction
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* File Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 shadow-2xl border border-white/10 relative overflow-hidden"
        >
          <input
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept={Object.entries(SUPPORTED_FORMATS)
              .map(([mime, ext]) => `${mime}, ${ext}`)
              .join(', ')}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer block relative"
          >
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center transition-all duration-300 hover:border-purple-500/50 hover:bg-white/5">
              <Upload className="h-12 w-12 mb-4 text-purple-400 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">
                {file ? file.name : 'Choose a file or drag it here'}
              </h3>
              <p className="text-sm text-gray-400">
                Supported formats: PNG, JPEG, PDF, DOC, DOCX, TXT, JSON, MD
              </p>
            </div>
          </label>

          {file && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Analysis Mode Selection - Scrollable on mobile */}
              <div className="relative">
                {/* Gradient indicators for scroll */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none md:hidden z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none md:hidden z-10" />
                
                {/* Scrollable container */}
                <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                  <div className="flex gap-2 min-w-max md:min-w-0 md:grid md:grid-cols-4">
                    <Button
                      onClick={() => setAnalysisMode({ type: 'general' })}
                      variant={analysisMode.type === 'general' ? 'default' : 'outline'}
                      className={`
                        flex-shrink-0 px-6 py-3 min-w-[140px]
                        md:flex-shrink md:px-4 md:min-w-0
                        ${analysisMode.type === 'general' ? 
                          'bg-purple-500/20 border-purple-500/30' : 
                          'bg-black/30 border-white/10 hover:border-purple-500/30'
                        }
                      `}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      General Analysis
                    </Button>
                    <Button
                      onClick={() => setAnalysisMode({ type: 'solve' })}
                      variant={analysisMode.type === 'solve' ? 'default' : 'outline'}
                      className={`
                        flex-shrink-0 px-6 py-3 min-w-[140px]
                        md:flex-shrink md:px-4 md:min-w-0
                        ${analysisMode.type === 'solve' ? 
                          'bg-purple-500/20 border-purple-500/30' : 
                          'bg-black/30 border-white/10 hover:border-purple-500/30'
                        }
                      `}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Solve Questions
                    </Button>
                    <Button
                      onClick={() => setAnalysisMode({ type: 'explain' })}
                      variant={analysisMode.type === 'explain' ? 'default' : 'outline'}
                      className={`
                        flex-shrink-0 px-6 py-3 min-w-[140px]
                        md:flex-shrink md:px-4 md:min-w-0
                        ${analysisMode.type === 'explain' ? 
                          'bg-purple-500/20 border-purple-500/30' : 
                          'bg-black/30 border-white/10 hover:border-purple-500/30'
                        }
                      `}
                    >
                      <Command className="w-4 h-4 mr-2" />
                      Explain Content
                    </Button>
                    <Button
                      onClick={() => setAnalysisMode({ type: 'summarize' })}
                      variant={analysisMode.type === 'summarize' ? 'default' : 'outline'}
                      className={`
                        flex-shrink-0 px-6 py-3 min-w-[140px]
                        md:flex-shrink md:px-4 md:min-w-0
                        ${analysisMode.type === 'summarize' ? 
                          'bg-purple-500/20 border-purple-500/30' : 
                          'bg-black/30 border-white/10 hover:border-purple-500/30'
                        }
                      `}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Summarize
                    </Button>
                  </div>
                </div>
              </div>

              {/* Custom Instructions Input */}
              <textarea
                placeholder="Add custom instructions or specific questions about the document... (optional)"
                className="w-full h-24 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
              />

              {/* Analysis Button */}
              <Button
                onClick={handleAnalysis}
                disabled={loading}
                className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-white p-6 text-lg rounded-xl border border-purple-500/30 transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    <span>
                      {analysisMode.type === 'solve' ? 'Solve Questions' :
                       analysisMode.type === 'explain' ? 'Explain Content' :
                       analysisMode.type === 'summarize' ? 'Summarize Document' :
                       'Analyze Document'}
                    </span>
                  </div>
                )}
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 text-red-200"
          >
            {error}
          </motion.div>
        )}

        {/* Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 backdrop-blur-xl bg-white/5 rounded-2xl p-8 shadow-2xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-purple-400">Analysis Results</h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">
                  <span>Tokens: {result.totalTokens}</span>
                  <span className="mx-2">•</span>
                  <span className="text-purple-400">Words: {result.metadata.wordCount}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyText}
                    className="hover:bg-white/10"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDownloadText}
                    className="hover:bg-white/10"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={markdownComponents}
              >
                {result.text}
              </ReactMarkdown>
            </div>
            
            <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                <span>Processed at: {new Date(result.metadata.processedAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>File type: {result.metadata.fileType}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

