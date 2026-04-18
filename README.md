# Rosna - Premium Fashion Storefront

A static React storefront for the Rosna fashion brand, built with Vite, TypeScript, and Tailwind CSS. Deployed on GitHub Pages.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router with HashRouter (for GitHub Pages compatibility)
- **Build Tool**: Vite
- **Deployment**: GitHub Pages with gh-pages
- **Linting**: ESLint
- **Formatting**: Prettier

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (ProductCard, etc.)
│   └── sections/        # Page sections (Header, Footer)
├── pages/               # Route components (Home, Products, etc.)
├── hooks/               # Custom hooks (useCart)
├── utils/               # Utility functions
├── types/               # TypeScript interfaces
└── data/                # Static data (products)
```

## Features

- Product catalog with categories
- Shopping cart with localStorage persistence
- Responsive design
- HashRouter for GitHub Pages routing
- External checkout integration placeholder

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Deployment

The project is configured for GitHub Pages deployment:

- Base path: `/daria-sklep/`
- Uses HashRouter for client-side routing
- gh-pages package handles deployment to `gh-pages` branch

After deployment, the site will be available at: `https://amiskiewiczpl.github.io/daria-sklep/`

## Cart and Checkout

- Cart data is stored in localStorage
- Checkout redirects to external payment processor (Stripe, PayPal, etc.)
- No backend required for basic functionality

## Integrations

- **Payments**: External (Stripe Checkout recommended)
- **Contact Forms**: External (Formspree, Netlify Forms)
- **Newsletter**: External (Mailchimp, ConvertKit)
