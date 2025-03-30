import React from 'react';
import { Button } from './ui/button';
import { Bot } from 'lucide-react';
import { getCurrentAIProvider, type AIProvider } from '@/lib/ai';

export function AIProviderSwitch() {
  const provider = getCurrentAIProvider();

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        disabled
      >
        <Bot className="w-4 h-4" />
        <span>AI: Gemini API</span>
      </Button>
    </div>
  );
}
