/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/***/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        'primary': '#3f5efb'
      }
    },
    backgroundImage: {
      'primary-gradient': 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
    },
  },
  plugins: [],
}

