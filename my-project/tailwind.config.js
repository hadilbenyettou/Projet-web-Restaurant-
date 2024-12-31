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
      },
    },
  },
  plugins: [],
}

