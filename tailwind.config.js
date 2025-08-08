/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00F0FF',
        accent: '#A020F0',
        cyber: '#00FF88',
        space: '#050B16',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Orbitron', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        neon: '0 0 10px rgba(0,240,255,0.6), 0 0 20px rgba(160,32,240,0.35)',
      }
    },
  },
  plugins: [],
}
