/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0A1020',
        surface: '#121A2B',
        elevated: '#1B2740',
        border: '#29354F',
        teal: '#3DD9C0',
        indigo: '#7C83FD',
        gold: '#F4B860',
        productive: '#34D399',
        okay: '#94A3B8',
        blocked: '#FB7185',
        'text-primary': '#F8FAFC',
        'text-secondary': '#7C88A8',
      },
      fontFamily: {
        sans: ['Inter'],
        serif: ['InstrumentSerif'],
      },
      borderRadius: {
        card: '24px',
      },
    },
  },
};
