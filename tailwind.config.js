/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-primary)',
          muted: 'var(--color-muted)',
          accent: 'var(--color-accent)',
          background: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          border: 'var(--color-border)',
        },
      },
      boxShadow: {
        premium: 'var(--shadow-card)',
      },
      borderRadius: {
        '4xl': 'var(--radius-xl)',
      },
    },
  },
  plugins: [],
}