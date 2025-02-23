/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a2942', // Deep navy blue
          light: '#2a3f5f',
          dark: '#0f1725',
        },
        secondary: {
          DEFAULT: '#c5a572', // Gold
          light: '#d4b989',
          dark: '#b6915b',
        },
        background: {
          DEFAULT: '#f8f8f8', // Off-white
          dark: '#121212',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};