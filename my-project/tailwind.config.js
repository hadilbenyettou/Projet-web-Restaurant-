/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBrown: '#7f4e0b',
        customGreen: '#328700',
        brown: {
          500: '#8B4513', // Classic Brown
          600: '#654321', // Darker Brown
          700: '#5A3A22', // Even Darker Brown
          800: '#4B3621', // Rich Brown
        },
        gold: {
          500: '#FFD700', // Classic Gold
        },
        beige: '#a48759',
         colors: {
        brown: {
          50: '#faf7f2',
          100: '#f5ede5',
          200: '#e8d5c4',
          300: '#d8b99e',
          400: '#c79a78',
          500: '#b07e5c',
          600: '#8e634a',
          700: '#6c4a38',
          800: '#4a3226',
          900: '#2a1c14',
        },
        beige: {
          100: '#f5f1e8',
          200: '#eae3d1',
          300: '#dfd5ba',
          400: '#d4c7a3',
          500: '#c9b98c',
        },
      },
      },
    },
  },
  plugins: [],
}

