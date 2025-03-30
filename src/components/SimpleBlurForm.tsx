import React, { useState } from 'react';

export const SimpleBlurForm: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(18);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Save to localStorage
    const userData = { name, age };
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Dispatch event to trigger cookie consent with debug
    console.log('Dispatching userDataUpdated event');
    window.dispatchEvent(new CustomEvent('userDataUpdated'));
    
    // Clear any existing cookie consent to ensure it shows
    localStorage.removeItem('cookieConsent');
    
    console.log('Form submitted:', userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      {/* Background Content */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-4xl w-full p-6 text-white">
          <h2 className="text-3xl font-bold mb-6">Background Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <div key={item} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl mb-2">Item {item}</h3>
                <p>This is some content that should be visible behind the blur.</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blur Overlay */}
      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm"></div>

      {/* Form (above the blur) */}
      <div className="fixed z-50 bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 w-96 max-w-full">
        <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-600 pb-2">
          User Information
        </h3>
        
        {submitted ? (
          <div className="text-green-400 p-4 bg-green-900/30 rounded-lg">
            <p>Thank you, {name}!</p>
            <p>Your information has been submitted.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};
