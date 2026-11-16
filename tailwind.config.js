/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#050508',
          900: '#030305',
          800: '#0a0a0f',
          700: '#12131a',
          600: '#1b1d28',
        },
        carbon: {
          DEFAULT: '#14151c',
          light: '#1e212b',
          dark: '#0c0d12',
        },
        silver: {
          luxury: '#d1d5db',
          muted: '#9ca3af',
        },
        badge: {
          red: '#ff1744',
          amber: '#f59e0b',
          cyan: '#00f0ff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syncopate', 'Cinzel', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
