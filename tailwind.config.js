export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brandBlue: '#7EA6E8',
        brandOrange: '#FF9800',
        brandDark: '#111111',
        brandDarker: '#080808',
        brandLight: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
};
