/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'main': "'Poppins', sans-serif"
      },
      colors: {
        'blue-detail-one': '#606dde',
        'blue-detail-two': '#5a7cdc'
      }
    },
  },
  plugins: [],
}

