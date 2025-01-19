/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'source-serif-4': ['"Source Serif 4"', 'serif'], // Add the font family
        'mono-sans': ['"Mona Sans"', 'serif'],
      }
    },
  },
  plugins: [],
}

