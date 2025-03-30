import React, { ReactNode, useState } from 'react';

interface BlurBackgroundProps {
  children?: ReactNode;
  isVisible?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
  opacity?: 'low' | 'medium' | 'high';
  onClick?: () => void;
  layout?: 'center' | 'top' | 'grid' | 'list';
  title?: string;
  showUserInfoForm?: boolean;
  onUserInfoSubmit?: (name: string, age: number) => void;
}

export const BlurBackground: React.FC<BlurBackgroundProps> = ({
  children,
  isVisible = true,
  intensity = 'medium',
  opacity = 'low',
  onClick,
  layout = 'center',
  title,
  showUserInfoForm = false,
  onUserInfoSubmit,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(18);

  if (!isVisible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUserInfoSubmit) {
      onUserInfoSubmit(name, age);
    }
  };

  const getBlurIntensity = () => {
    switch (intensity) {
      case 'light':
        return 'backdrop-blur-sm';
      case 'heavy':
        return 'backdrop-blur-xl';
      case 'medium':
      default:
        return 'backdrop-blur-md';
    }
  };

  const getOpacity = () => {
    switch (opacity) {
      case 'low':
        return 'bg-black/10'; // Very light background (10% opacity)
      case 'high':
        return 'bg-black/30'; // More visible background (30% opacity)
      case 'medium':
      default:
        return 'bg-black/20'; // Moderate background (20% opacity)
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'top':
        return 'items-start pt-16';
      case 'grid':
        return 'items-center justify-center';
      case 'list':
        return 'items-center justify-start pl-8';
      case 'center':
      default:
        return 'items-center justify-center';
    }
  };

  return (
    <>
      {/* User Info Form - Positioned above the blur */}
      {showUserInfoForm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gray-800 rounded-lg p-6 shadow-2xl border border-gray-700 w-96 max-w-full">
            <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-600 pb-2">
              User Information
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-white mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="age" className="block text-white mb-2">Your Age</label>
                <select
                  id="age"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {Array.from({ length: 83 }, (_, i) => i + 18).map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
              
              <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition-colors w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Blur Background */}
      <div
        className={`fixed inset-0 ${getOpacity()} ${getBlurIntensity()} z-40 flex ${getLayoutClasses()}`}
        onClick={onClick}
      >
        <div 
          className="bg-gray-800/70 rounded-lg p-6 max-w-4xl w-full mx-4 shadow-xl" 
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <h2 className="text-xl font-semibold mb-4 text-white border-b border-gray-600 pb-2">
              {title}
            </h2>
          )}

          <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : ''}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
