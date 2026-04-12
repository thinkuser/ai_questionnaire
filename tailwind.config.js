/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#11061d',
          surface: '#1a0d2e',
          cyan: '#19ffff',
          magenta: '#ff47e2',
          purple: '#9747ff',
        },
      },
    },
  },
  plugins: [],
}
