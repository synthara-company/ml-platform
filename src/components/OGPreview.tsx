import React from 'react';

export function OGPreview() {
  const isDevelopment = import.meta.env.DEV;
  
  const domains = {
    primary: 'https://keynote-niladridas.vercel.app',
    secondary: 'https://keynote-niladridas.vercel.app'
  };
  
  const meta = {
    url: isDevelopment ? 'http://localhost:5173' : domains.primary,
    alternateUrl: domains.secondary,
    title: 'ML Learning Platform',
    description: 'Your interactive guide to mastering machine learning concepts. Built with practical implementation experience and industry best practices.',
    image: isDevelopment 
      ? 'http://localhost:5173/og-image.png' 
      : 'https://raw.githubusercontent.com/bniladridas/keynote.niladridas/main/public/og-image.png',
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">Open Graph Preview</h2>
      
      {/* Facebook Preview */}
      <div className="border rounded-lg p-4 space-y-2">
        <h3 className="font-semibold">Facebook</h3>
        <div className="bg-white rounded-lg border overflow-hidden">
          <img 
            src={meta.image} 
            alt="OG Preview" 
            className="w-full h-[300px] object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/1200x630/gray/white?text=Image+Not+Found';
            }}
          />
          <div className="p-4">
            <p className="text-blue-600 text-sm">{meta.url}</p>
            <p className="font-bold">{meta.title}</p>
            <p className="text-gray-600 text-sm">{meta.description}</p>
          </div>
        </div>
      </div>

      {/* LinkedIn Preview */}
      <div className="border rounded-lg p-4 space-y-2">
        <h3 className="font-semibold">LinkedIn</h3>
        <div className="bg-[#f3f2ef] rounded-lg border overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <img 
              src={meta.image} 
              alt="LinkedIn Preview" 
              className="w-full md:w-[200px] h-[200px] object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/1200x630/gray/white?text=Image+Not+Found';
              }}
            />
            <div className="p-4">
              <p className="font-bold text-[#000000E6] text-base">{meta.title}</p>
              <p className="text-[#00000099] text-sm mt-1">{meta.description}</p>
              <div className="flex items-center mt-2">
                <div className="w-4 h-4 bg-gray-200 rounded-sm mr-2" />
                <p className="text-[#00000099] text-xs">{new URL(meta.url).hostname}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Twitter Preview */}
      <div className="border rounded-lg p-4 space-y-2">
        <h3 className="font-semibold">Twitter</h3>
        <div className="bg-white rounded-lg border overflow-hidden">
          <img 
            src={meta.image} 
            alt="Twitter Preview" 
            className="w-full h-[300px] object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/1200x630/gray/white?text=Image+Not+Found';
            }}
          />
          <div className="p-4">
            <p className="font-bold">{meta.title}</p>
            <p className="text-gray-600 text-sm">{meta.description}</p>
            <p className="text-gray-500 text-sm mt-2">{meta.url}</p>
          </div>
        </div>
      </div>

      {/* Meta Tags Preview */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Current Meta Tags</h3>
        <pre className="bg-gray-800 p-4 rounded text-sm overflow-x-auto text-white">
          {`<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${meta.url}" />
<meta property="og:title" content="${meta.title}" />
<meta property="og:description" content="${meta.description}" />
<meta property="og:image" content="${meta.image}" />

<!-- Alternate URL -->
<link rel="alternate" href="${meta.alternateUrl}" />

<!-- LinkedIn specific -->
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="ML Learning Platform" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${meta.url}" />
<meta property="twitter:title" content="${meta.title}" />
<meta property="twitter:description" content="${meta.description}" />
<meta property="twitter:image" content="${meta.image}" />`}
        </pre>
      </div>

      {/* LinkedIn Post Inspector Link */}
      <div className="mt-4 text-center">
        <a 
          href="https://www.linkedin.com/post-inspector/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Test your URL with LinkedIn Post Inspector →
        </a>
      </div>
    </div>
  );
}
