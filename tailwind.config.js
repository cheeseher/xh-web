/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#009688',
        'primary-dark': '#00796b',
        'primary-light': '#26a69a',
        secondary: '#10B981',
        dark: '#1F2937',
        light: '#F9FAFB',
        price: '#ff4d4f',
        'price-light': '#fff2f0',
        'batch-price': '#52c41a',
        'batch-price-light': '#f6ffed',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}