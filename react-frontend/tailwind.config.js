/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'c-1': 'var(--c-1)',
        'c-2': 'var(--c-2)',
        'c-text-1': 'var(--c-text-1)',
        'c-5': 'var(--c-5',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'chakra-blue': 'var(--chakra-blue)',
        'c-4': 'var(--c-4)',
        'c-6': 'var(--c-6)',
        'c-7': 'var(--c-7)',
        'c-8': 'var(--c-8)',
        'c-9': 'var(--c-9)',
      },
      boxShadow: {
        issue: '0 1px 2px 0 #091e4240',
        list: '0 0 2px 0 #091e4230',
      },
    },
  },
  plugins: [],
};
