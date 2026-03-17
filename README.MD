# Strike Run Club

Ajmer's premier running community web application built with Next.js 14, Material UI v5, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** Material UI v5 with Emotion
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS + MUI theming
- **Language:** TypeScript

## Features

- **Homepage** - Hero section with animated gradients, live stats counter, featured event with countdown
- **Events** - Browse upcoming and past events with filtering tabs
- **Join** - Member registration form with validation
- **Gallery** - Masonry photo grid with category filtering and lightbox
- **Admin Dashboard** - View registrations and community stats
- **About** - Team profiles and mission statement
- **Contact** - Contact form with multiple contact methods

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd strike-run-club
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── about/          # About page
│   ├── admin/          # Admin dashboard
│   ├── contact/        # Contact page
│   ├── events/         # Events listing and detail pages
│   ├── gallery/        # Photo gallery
│   ├── join/           # Registration page
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── strike/         # Strike Run Club components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── hero-section.tsx
│   │   ├── stats-section.tsx
│   │   ├── featured-event.tsx
│   │   ├── countdown-timer.tsx
│   │   ├── event-card.tsx
│   │   ├── events-tabs.tsx
│   │   ├── registration-form.tsx
│   │   ├── community-grid.tsx
│   │   └── whatsapp-fab.tsx
│   ├── providers.tsx   # MUI Theme & Color Mode providers
│   └── ui/             # shadcn/ui components
├── lib/
│   ├── theme.ts        # MUI theme configuration
│   ├── data.ts         # Mock data (events, gallery, stats)
│   └── color-mode-context.tsx
└── public/             # Static assets
```

## Data Storage

Currently uses localStorage for demonstration:
- **Registrations** are stored in `localStorage` under the key `strike-registrations`
- **Mock data** for events and gallery is in `lib/data.ts`

To connect a real database, replace the localStorage calls in:
- `components/strike/registration-form.tsx`
- `app/admin/page.tsx`

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Customization

### Theme Colors

Edit `lib/theme.ts` to change the color palette:
- Primary: `#FF5722` (Orange)
- Dark Surface: `#1A1A2E`

### Content

Update mock data in `lib/data.ts`:
- `mockEvents` - Event listings
- `galleryImages` - Gallery photos
- `communityStats` - Homepage statistics

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or manually:
```bash
pnpm build
pnpm start
```

## License

MIT
