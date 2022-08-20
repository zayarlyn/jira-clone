/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { 'light-c-1': '#fff', 'light-c-2': '#f4f5f7', 'light-c-3': '#172B4D' },
      boxShadow: {
        'light-issue': '0 1px 2px 0 #091e4240',
        'light-list': '0 0 2px 0 #091e4230',
      },
    },
  },
  plugins: [],
};
