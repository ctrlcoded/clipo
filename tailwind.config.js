/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F3FF',  // Very Light Blue
          100: '#CCE7FF',
          200: '#99D6FF', // Light Blue
          300: '#66C4FF',
          400: '#33B3FF',
          500: '#00AAFF', // Bright Blue
          600: '#0088CC',
          700: '#006699', // Deep Blue
          800: '#004466',
          900: '#003344', // Dark Blue
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
} 