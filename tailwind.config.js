/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'charcoal': '#3A3D51',
      },
    },
    maxWidth: {
      'xs': '20rem',
      '2xs': '16rem',
      '3xs': '12rem',
      'min': 'min-content',
      'fit': 'fit-content'
    },
    maxHeight: {
      '2xs': '16rem',
      '3xs': '12rem'
    }
  },
  plugins: [],
}
