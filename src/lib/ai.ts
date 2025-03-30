import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, GenerateContentResult } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY environment variable');
}

export type AIProvider = 'gemini';

export interface AIResponse {
  text: string;
  totalTokens: number;
  promptTokens: number;
  completionTokens: number;
  thoughts?: string[];
}

const CONFIG = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: "text/plain",
};

class AIService {
  private static instance: AIService;
  private rateLimitQueue: Array<() => Promise<any>> = [];
  private processingQueue = false;

  private async processQueue() {
    if (this.processingQueue) return;
    this.processingQueue = true;
    
    while (this.rateLimitQueue.length > 0) {
      const task = this.rateLimitQueue.shift();
      if (task) {
        try {
          await task();
          // Add delay between requests
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error('AI Service Error:', error);
        }
      }
    }
    
    this.processingQueue = false;
  }

  private currentProvider: AIProvider = 'gemini';
  private geminiAI: GoogleGenerativeAI | null = null;
  private chatSession: any = null;

  private constructor() {
    if (GEMINI_API_KEY) {
      this.geminiAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      this.initializeChat();
    }
  }

  private initializeChat() {
    if (!this.geminiAI) return;
    
    const model = this.geminiAI.getGenerativeModel({
      model: "gemini-2.5-pro-exp-03-25",
      generationConfig: CONFIG,
    });

    this.chatSession = model.startChat({
      history: [],
    });
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  public getCurrentProvider(): AIProvider {
    return this.currentProvider;
  }

  public async countTokens(text: string): Promise<number> {
    if (!this.geminiAI) throw new Error('AI service not initialized');
    
    const model = this.geminiAI.getGenerativeModel({ 
      model: "gemini-2.5-pro-exp-03-25",
      generationConfig: CONFIG,
    });
    const result = await model.countTokens(text);
    return result.totalTokens;
  }

  public async getResponse(prompt: string): Promise<AIResponse> {
    return new Promise((resolve, reject) => {
      this.rateLimitQueue.push(async () => {
        try {
          if (!this.geminiAI) {
            throw new Error('AI service not initialized');
          }

          try {
            const promptTokenCount = await this.countTokens(prompt);
            const enhancedPrompt = `
              Think through this step by step:
              1. First, understand what is being asked
              2. Then, organize the key points
              3. Finally, provide a comprehensive response

              Question: ${prompt}

              Let's solve this systematically.
            `;

            const response = await this.chatSession.sendMessage(enhancedPrompt);
            const result = await response.response;
            const text = result.text();
            const completionTokenCount = await this.countTokens(text);

            // Extract thinking steps from the response
            const thoughts = text
              .split('\n')
              .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'))
              .map(line => line.replace(/^[•-]\s*/, ''));

            resolve({
              text: text.split('Final Response:').pop()?.trim() || text,
              totalTokens: promptTokenCount + completionTokenCount,
              promptTokens: promptTokenCount,
              completionTokens: completionTokenCount,
              thoughts
            });
          } catch (error) {
            console.error('Error in AI response:', error);
            reject(error);
          }
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }
}

const aiService = AIService.getInstance();

export const getCurrentAIProvider = () => aiService.getCurrentProvider();
export const getAIResponse = (prompt: string) => aiService.getResponse(prompt);
export const getTokenCount = async (text: string): Promise<number> => {
  return aiService.countTokens(text);
};

export const getAIExplanation = async (topic: string, concept: string): Promise<AIResponse> => {
  try {
    const prompt = `Explain the concept of "${concept}" in the context of ${topic}. 
      Provide a clear and concise explanation suitable for a learning platform.`;
    const response = await getAIResponse(prompt);
    return response;
  } catch (error) {
    console.error('Error getting AI explanation:', error);
    throw error;
  }
};

export const getAICodeExample = async (concept: string): Promise<AIResponse> => {
  const prompt = `Provide a practical code example demonstrating ${concept}. 
    Include comments explaining key parts. Format the response in markdown.`;
  return getAIResponse(prompt);
};

export const getAIQuiz = async (topic: string): Promise<{
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
}> => {
  const prompt = `Create a quiz about ${topic} with 3 multiple choice questions. 
    Format the response as a JSON object with questions, options, and correctAnswer indices.`;
  const response = await getAIResponse(prompt);
  try {
    return JSON.parse(response);
  } catch (error) {
    console.error('Failed to parse quiz response:', error);
    throw new Error('Failed to generate quiz');
  }
};
