/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        'brand': {
          orange: '#FF6F00',
          'orange-light': '#FF8F00',
          'orange-lighter': '#FFB74D',
          'orange-lightest': '#FFE0B2',
          'orange-dark': '#F57C00',
          'orange-darker': '#E65100',
          purple: '#4B0082',
          'purple-light': '#6A0DAD',
          'purple-lighter': '#8A2BE2',
          'purple-lightest': '#DDA0DD',
          'purple-dark': '#3B006B',
          'purple-darker': '#2B0051',
          white: '#FFFFFF',
          'white-soft': '#FAFAFA',
          'white-dim': '#F5F5F5',
        },
        // UI Colors derived from brand palette
        'primary': {
          50: '#FFE0B2',
          100: '#FFCC80',
          200: '#FFB74D',
          300: '#FFA726',
          400: '#FF9800',
          500: '#FF6F00',
          600: '#F57C00',
          700: '#E65100',
          800: '#BF360C',
          900: '#A0290C',
        },
        'secondary': {
          50: '#F3E5F5',
          100: '#E1BEE7',
          200: '#CE93D8',
          300: '#BA68C8',
          400: '#AB47BC',
          500: '#4B0082',
          600: '#6A0DAD',
          700: '#3B006B',
          800: '#2B0051',
          900: '#1A0033',
        },
        // Semantic colors
        'success': {
          light: '#81C784',
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
        },
        'warning': {
          light: '#FFB74D',
          DEFAULT: '#FF9800',
          dark: '#F57C00',
        },
        'error': {
          light: '#E57373',
          DEFAULT: '#F44336',
          dark: '#D32F2F',
        },
        'info': {
          light: '#64B5F6',
          DEFAULT: '#2196F3',
          dark: '#1976D2',
        },
        // Mental Health & Community Trust (updated)
        'mental-health': {
          low: '#F44336',
          medium: '#FF9800',
          high: '#4CAF50',
        },
        'community-trust': {
          low: '#F44336',
          medium: '#FF6F00',
          high: '#2196F3',
        },
        // Neutral grays with purple undertones
        'neutral': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        }
      },
      animation: {
        'meter-change': 'pulse 0.5s ease-in-out',
        'badge-unlock': 'bounce 1s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'subtle-float': 'subtle-float 20s ease-in-out infinite',
        'subtle-drift': 'subtle-drift 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(249, 115, 22, 0.8)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100px)' },
        },
        'subtle-float': {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px)',
            opacity: '0.1'
          },
          '25%': { 
            transform: 'translateY(-5px) translateX(2px)',
            opacity: '0.15'
          },
          '50%': { 
            transform: 'translateY(0px) translateX(5px)',
            opacity: '0.1'
          },
          '75%': { 
            transform: 'translateY(3px) translateX(-2px)',
            opacity: '0.08'
          },
        },
        'subtle-drift': {
          '0%': { 
            transform: 'translateX(0px) translateY(0px)',
            opacity: '0.05'
          },
          '33%': { 
            transform: 'translateX(-10px) translateY(-5px)',
            opacity: '0.08'
          },
          '66%': { 
            transform: 'translateX(5px) translateY(-8px)',
            opacity: '0.03'
          },
          '100%': { 
            transform: 'translateX(0px) translateY(0px)',
            opacity: '0.05'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animationDelay: {
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
        '1400': '1400ms',
        '1600': '1600ms',
        '2000': '2000ms',
      },
      opacity: {
        '8': '0.08',
        '15': '0.15',
      }
    },
  },
  plugins: [],
}