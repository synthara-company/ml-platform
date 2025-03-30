import React, { useState } from 'react';
import { BlurBackground } from './BlurBackground';

export const BlurBackgroundExample: React.FC = () => {
  const [showBlur, setShowBlur] = useState(true);
  const [userData, setUserData] = useState<{ name: string; age: number } | null>(null);

  const handleUserInfoSubmit = (name: string, age: number) => {
    setUserData({ name, age });
    console.log(`User submitted: ${name}, ${age}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-white mb-4">BlurBackground Example</h1>
      
      <button 
        onClick={() => setShowBlur(!showBlur)} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showBlur ? 'Hide Blur' : 'Show Blur'}
      </button>
      
      {userData && (
        <div className="mb-4 p-4 bg-gray-800 text-white rounded">
          <p>Name: {userData.name}</p>
          <p>Age: {userData.age}</p>
        </div>
      )}
      
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl text-white mb-4">Content Behind Blur</h2>
        <p className="text-gray-300">
          This is some example content that will be visible behind the blur effect.
          The blur should make this text slightly harder to read, but still visible.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[1, 2, 3, 4, 5, 6].map(item => (
            <div key={item} className="bg-gray-700 p-4 rounded">
              <p className="text-white">Item {item}</p>
            </div>
          ))}
        </div>
      </div>
      
      <BlurBackground 
        isVisible={showBlur}
        intensity="light"
        opacity="low"
        showUserInfoForm={true}
        onUserInfoSubmit={handleUserInfoSubmit}
        title="Example Blur Background"
        layout="grid"
      >
        <div className="bg-gray-700 p-4 rounded text-white">
          <p>This is content inside the blur container</p>
        </div>
        <div className="bg-gray-700 p-4 rounded text-white">
          <p>Another item inside the blur container</p>
        </div>
      </BlurBackground>
    </div>
  );
};