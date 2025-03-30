import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;

const GENERATION_CONFIG = {
  temperature: 0.9,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

class ImageGenerationService {
  private static instance: ImageGenerationService;
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private chatSession: any = null;

  private constructor() {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    this.initializeModel();
  }

  private initializeModel() {
    if (!this.genAI) return;
    
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
    });

    this.chatSession = this.model.startChat({
      generationConfig: GENERATION_CONFIG,
      history: [],
    });
  }

  public static getInstance(): ImageGenerationService {
    if (!ImageGenerationService.instance) {
      ImageGenerationService.instance = new ImageGenerationService();
    }
    return ImageGenerationService.instance;
  }

  private extractImageUrl(text: string): string {
    console.log('Attempting to extract URL from:', text);

    // Try to find markdown image syntax
    const markdownMatch = text.match(/!\[.*?\]\((.*?)\)/);
    if (markdownMatch) return markdownMatch[1];

    // Try to find a direct URL
    const urlMatch = text.match(/https?:\/\/[^\s<>"]+?\.(?:jpg|jpeg|gif|png|webp)/i);
    if (urlMatch) return urlMatch[0];

    // Try to find a base64 image
    const base64Match = text.match(/data:image\/[^;]+;base64,[^"'\s]+/i);
    if (base64Match) return base64Match[0];

    // Try to parse JSON response
    try {
      // Look for any JSON-like structure in the text
      const jsonMatches = text.match(/\{[^{}]*\}/g);
      if (jsonMatches) {
        for (const match of jsonMatches) {
          const data = JSON.parse(match);
          if (data.url) return data.url;
          if (data.image_url) return data.image_url;
          if (data.imageUrl) return data.imageUrl;
        }
      }
    } catch (e) {
      console.log('JSON parsing attempt failed:', e);
    }

    throw new Error('No valid image data found in response');
  }

  public async generateImage(prompt: string): Promise<string> {
    if (!this.chatSession) {
      throw new Error('Image generation service not initialized');
    }

    try {
      // Format the prompt to explicitly request an image
      const enhancedPrompt = `Generate an image matching this description: "${prompt}". 
        The response should contain a direct image URL or a JSON object with the image URL.`;
      
      const result = await this.chatSession.sendMessage(enhancedPrompt);
      const response = result.response;
      const text = response.text();
      
      if (!text) {
        throw new Error('Empty response from the model');
      }

      console.log('Raw model response:', text);
      
      const imageUrl = this.extractImageUrl(text);
      
      // Validate the URL format
      if (!imageUrl.startsWith('http') && !imageUrl.startsWith('data:image')) {
        throw new Error('Invalid image URL format received');
      }

      return imageUrl;

    } catch (error) {
      console.error('Error in generateImage:', error);
      throw new Error('Failed to generate image. Please try again.');
    }
  }

  public async generateHeroImage(): Promise<string> {
    // Enhanced AI prompt for generating modern tech-themed images
    // Each line carefully crafted to create specific visual elements
    const prompt = `Create a hyper-modern, minimalist representation of AI and machine learning. 
      Use a sophisticated dark theme with:
      // Color scheme: Electric blue and deep purple for a futuristic look
      - Subtle neon accents in electric blue and deep purple
      // Dynamic elements: Adding movement and depth
      - Floating geometric particles
      // Neural network visualization: Core AI representation
      - Abstract neural pathways with gradient illumination
      // Modern design principles: Keeping it clean and professional
      - Clean, sharp edges and modern design elements
      Style should convey cutting-edge technology with a professional aesthetic.`;
    
    return this.generateImage(prompt);
  }
}

const imageGenerationService = ImageGenerationService.getInstance();

export const generateImage = (prompt: string) => imageGenerationService.generateImage(prompt);
export const generateHeroImage = () => imageGenerationService.generateHeroImage();
