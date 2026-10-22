/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vihaan: {
          navy: {
            950: '#040F20',
            900: '#061A33', // Deep Navy Brand
            800: '#0B3A78', // Royal Blue Brand
            700: '#144E9E',
            600: '#1E62C4',
            100: '#E8F0FE',
            50: '#F0F5FF'
          },
          gold: {
            600: '#B88A1A',
            500: '#D9A928', // Gold Brand
            400: '#E5B842',
            300: '#F5D36A', // Light Gold
            100: '#FDF6E2',
            50: '#FFFDF7'
          },
          dark: '#152238',
          bg: '#F7F8FA',
          surface: '#FFFFFF',
          border: '#E2E8F0'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(6, 26, 51, 0.08), 0 2px 6px -1px rgba(6, 26, 51, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(6, 26, 51, 0.12), 0 4px 10px -2px rgba(6, 26, 51, 0.06)',
        'gold-glow': '0 0 25px rgba(217, 169, 40, 0.35)',
        'navy-glow': '0 0 25px rgba(11, 58, 120, 0.35)',
        'modal': '0 25px 50px -12px rgba(6, 26, 51, 0.25)',
      }
    },
  },
  plugins: [],
}
