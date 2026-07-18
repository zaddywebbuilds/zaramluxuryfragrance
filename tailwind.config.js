/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FCFAF6',
          100: '#FBF7F1',
          200: '#F7F0E6',
          300: '#F7EBD2',
          400: '#F0DFC0',
        },
        champagne: {
          100: '#F7EBD2',
          200: '#EFD9B1',
          300: '#E2C7AE',
          400: '#D4AC70',
          500: '#B8843D',
        },
        blush: {
          100: '#FBEFEB',
          200: '#F8D8DE',
          300: '#F0C0C8',
        },
        brown: {
          50: '#553B28',
          100: '#2A1B0F',
          200: '#24150D',
        },
        gold: {
          light: '#EFD9B1',
          DEFAULT: '#D4AC70',
          dark: '#B8843D',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #FBF7F1 0%, #F7EBD2 42%, #FBEFEB 100%)',
        'dark-gradient': 'linear-gradient(135deg, #24150D 0%, #2A1B0F 50%, #3A2010 100%)',
        'gold-gradient': 'linear-gradient(135deg, #EFD9B1 0%, #D4AC70 50%, #B8843D 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'luxury': '0 8px 40px rgba(42, 27, 15, 0.08)',
        'luxury-hover': '0 20px 60px rgba(42, 27, 15, 0.14)',
        'gold': '0 4px 20px rgba(212, 172, 112, 0.25)',
        'card': '0 2px 16px rgba(42, 27, 15, 0.06)',
      },
    },
  },
  plugins: [],
}
