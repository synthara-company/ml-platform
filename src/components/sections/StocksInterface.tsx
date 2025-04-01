
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, ArrowLeft, Search, Loader2, 
  Brain, BarChart, LineChart as LineChartIcon, 
  CandlestickChart, TrendingDown, Activity,
  PieChart, History, MessageSquare
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart as RechartsBarChart, Bar,
  ScatterChart, Scatter, PieChart as RechartsPieChart,
  Pie, Cell
} from 'recharts';
import { Button } from '../ui/button';
import { getAIResponse } from '@/lib/ai';
import ReactMarkdown from 'react-markdown';

interface StockData {
  date: string;
  price: number;
  volume: number;
  sentiment: number;
  volatility: number;
  momentum: number;
  rsi: number;
  macd: number;
}

export function StocksInterface() {
  const navigate = useNavigate();
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M'); // 1D, 1W, 1M, 3M, 1Y

  const generateMockData = (days: number) => {
    const data: StockData[] = [];
    let price = 100;
    let volume = 1000000;
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      // Simulate price movements
      price += (Math.random() - 0.5) * 5;
      volume += (Math.random() - 0.5) * 200000;
      
      data.push({
        date: date.toLocaleDateString(),
        price: Number(price.toFixed(2)),
        volume: Math.max(0, Math.round(volume)),
        sentiment: Math.random() * 100,
        volatility: Math.random() * 0.1,
        momentum: Math.random() * 100,
        rsi: Math.random() * 100,
        macd: Math.random() * 10
      });
    }
    
    return data;
  };

  const handleAnalysis = async () => {
    if (!symbol.trim() || loading) return;
    
    setLoading(true);
    try {
      // Generate mock data for demonstration
      const mockData = generateMockData(30);
      setStockData(mockData);

      const response = await getAIResponse(
        `Analyze the stock ${symbol} with the following data:\n` +
        `Current Price: $${mockData[mockData.length - 1].price}\n` +
        `30-day Price Range: $${Math.min(...mockData.map(d => d.price))} - $${Math.max(...mockData.map(d => d.price))}\n` +
        `Average Volume: ${Math.round(mockData.reduce((acc, curr) => acc + curr.volume, 0) / mockData.length).toLocaleString()}\n\n` +
        `Please provide:\n` +
        `1. Technical Analysis\n` +
        `2. Market Trends\n` +
        `3. Key Performance Indicators\n` +
        `4. Risk Assessment\n` +
        `5. Trading Recommendations`
      );
      
      setAnalysis(response.text);
    } catch (error) {
      console.error('Error analyzing stock:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPriceChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={stockData}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="date" 
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: 'rgba(255,255,255,0.5)' }}
        />
        <YAxis 
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: 'rgba(255,255,255,0.5)' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}
          labelStyle={{ color: '#fff' }}
        />
        <Area 
          type="monotone" 
          dataKey="price" 
          stroke="#8b5cf6" 
          fillOpacity={1} 
          fill="url(#colorPrice)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderVolumeChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={stockData}>
        <defs>
          <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="date" 
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: 'rgba(255,255,255,0.5)' }}
        />
        <YAxis 
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: 'rgba(255,255,255,0.5)' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}
          labelStyle={{ color: '#fff' }}
        />
        <Bar dataKey="volume" fill="url(#colorVolume)" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );

  const renderSentimentChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={stockData}>
        <defs>
          <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="date" 
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: 'rgba(255,255,255,0.5)' }}
        />
        <YAxis 
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: 'rgba(255,255,255,0.5)' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}
          labelStyle={{ color: '#fff' }}
        />
        <Line 
          type="monotone" 
          dataKey="sentiment" 
          stroke="#ec4899" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderMomentumChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={stockData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
        <YAxis stroke="rgba(255,255,255,0.5)" />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }} />
        <Line type="monotone" dataKey="momentum" stroke="#10b981" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderRSIChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={stockData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
        <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.5)" />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }} />
        <Line type="monotone" dataKey="rsi" stroke="#f59e0b" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderMACDChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={stockData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
        <YAxis stroke="rgba(255,255,255,0.5)" />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }} />
        <Line type="monotone" dataKey="macd" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );

  const TimeframeSelector = () => (
    <div className="flex gap-2 mb-6">
      {['1D', '1W', '1M', '3M', '1Y'].map(tf => (
        <Button
          key={tf}
          variant={selectedTimeframe === tf ? 'default' : 'outline'}
          onClick={() => setSelectedTimeframe(tf)}
          className="px-4 py-2"
        >
          {tf}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white p-6">
      {/* Animated background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[gradient_3s_linear_infinite] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(68,68,68,0.2),transparent)] animate-pulse" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-safe pb-4 sm:py-8 relative">
        {/* Enhanced Header with glassmorphism - matching DocumentAnalysisInterface */}
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
        </motion.div>

        {/* Title Section with Icon - matching DocumentAnalysisInterface style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 shadow-2xl border border-white/10 mb-8"
        >
          <div className="flex items-start gap-8 relative z-10">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
                <div className="relative z-10 p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-white/10">
                  <TrendingUp className="w-12 h-12 text-purple-400" />
                </div>
              </div>
            </div>
            <div className="space-y-6 flex-1">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                  Stock Analysis
                  <span className="text-purple-400">
                    <Brain className="w-6 h-6 animate-pulse" />
                  </span>
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-2">
                  Get AI-powered insights and analysis for any stock
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 shadow-2xl border border-white/10 relative overflow-hidden"
        >
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="Enter stock symbol (e.g., AAPL)"
              className="flex-1 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            <Button
              onClick={handleAnalysis}
              disabled={loading || !symbol.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 rounded-xl flex items-center gap-3 transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {/* Charts Grid */}
          {stockData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
            >
              {/* Price Chart */}
              <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <LineChartIcon className="w-5 h-5 text-purple-400" />
                  <h4 className="text-lg font-semibold">Price Trend</h4>
                </div>
                {renderPriceChart()}
              </div>

              {/* Volume Chart */}
              <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart className="w-5 h-5 text-blue-400" />
                  <h4 className="text-lg font-semibold">Trading Volume</h4>
                </div>
                {renderVolumeChart()}
              </div>

              {/* Sentiment Chart */}
              <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-pink-400" />
                  <h4 className="text-lg font-semibold">Market Sentiment</h4>
                </div>
                {renderSentimentChart()}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Technical Indicators */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-green-400" />
              <h4 className="text-lg font-semibold">Momentum</h4>
            </div>
            {renderMomentumChart()}
          </div>

          <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-semibold">RSI</h4>
            </div>
            {renderRSIChart()}
          </div>

          <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-blue-400" />
              <h4 className="text-lg font-semibold">MACD</h4>
            </div>
            {renderMACDChart()}
          </div>
        </motion.div>

        {/* Analysis Results */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 backdrop-blur-xl bg-white/5 rounded-2xl p-8 shadow-2xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-purple-400">Analysis Results</h2>
              <div className="text-sm text-gray-400">
                <span>Symbol: {symbol}</span>
                <span className="mx-2">•</span>
                <span className="text-purple-400">Last Updated: {new Date().toLocaleString()}</span>
              </div>
            </div>
            <div className="prose prose-invert prose-lg max-w-none bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

