/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './apps/*/index.html',
    './apps/*/src/**/*.{js,ts,jsx,tsx}',
    './packages/**/*.{js,ts,jsx,tsx}',
  ],
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
        'premium-hover': 'var(--shadow-card-hover)',
      },
      borderRadius: {
        '4xl': 'var(--radius-xl)',
      },
    },
  },
  plugins: [],
}
