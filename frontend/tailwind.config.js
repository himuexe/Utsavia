/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vibrant-magenta': '#FF1493',
        'golden-yellow': '#FFD700',
        'electric-blue': '#00BFFF',
        'dark-background': '#121212',
        'light-text': '#F0F0F0',
      },
      fontFamily: {
        'secondary': ['Montserrat', 'sans-serif'],
        'primary': ['Open Sans', 'sans-serif'],
        'happiness': ['Josefin Sans', 'sans-serif'],
      }
    }
  },
  plugins: [],
}

