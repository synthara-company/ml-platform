/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c2d4c2',      // Primary sage green color
        background: '#000000',    
        surface: '#111111',       
        border: '#222222',        
        'surface-hover': '#1A1A1A',
        'text-primary': '#c2d4c2', 
        'text-secondary': '#889688', 
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
      },
    },
  },
  plugins: [],
};
