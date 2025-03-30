import React from 'react';

export function OpenGraphImage() {
  return (
    <div className="w-[1200px] h-[630px] bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-16">
      <div className="space-y-8">
        <h1 className="text-5xl font-bold text-white">ML Learning Platform</h1>
        <p className="text-2xl text-gray-300 max-w-3xl">
          Your interactive guide to mastering machine learning concepts. Built with practical implementation experience and industry best practices.
        </p>
        <div className="flex items-center gap-4 mt-8">
          <span className="text-xl text-white">by Niladri Das</span>
          <span className="text-gray-400">•</span>
          <span className="text-xl text-blue-400">ML Engineer & Developer</span>
        </div>
      </div>
    </div>
  );
}

// Export a function to generate a static image
export async function generateStaticOGImage() {
  // Implementation for generating static image
  // You can use html-to-image or similar library
}
