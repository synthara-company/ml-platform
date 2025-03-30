/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',  // TV/Large Desktop
        '4xl': '2560px',  // 4K screens
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      colors: {
        primary: '#c2d4c2',
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
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [], // Removed the aspect-ratio plugin
};
