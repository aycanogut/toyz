# TOYZ

A webzine platform about graffiti, street art, underground music, skateboarding, cinema, photography, and art — all rooted in counter-culture.

## Tech Stack

- **Next.js 16** - React framework
- **Payload CMS** - Headless CMS
- **MongoDB** - Database
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **next-intl** - Internationalization (en, tr)
- **Cloudflare R2 Blob Storage** - Media storage
- **Resend** - Email service

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm 12.3.4 or higher
- MongoDB database
- Cloudflare R2 Bucket account
- Resend API key
- Google reCAPTCHA keys

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd toyz
```

2. Install dependencies:

```bash
pnpm install
```

3. Create `.env.local` file with the following variables:

```env
NEXT_PUBLIC_TITLE=TOYZ
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=contact@example.com
DATABASE_URI=mongodb://localhost:27017/toyz
PAYLOAD_SECRET=your-secret-key
RESEND_API_KEY=your-resend-key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
R2_BUCKET_NAME=your-r2-bucket-name
R2_ACCESS_KEY_ID=your-acces-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-okey
R2_ENDPOINT=your-endpoint
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/your-account
CRON_SECRET=your-cron-secret
```

4. Generate environment variable types:

```bash
pnpm generate:env-key-types
```

5. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.  
Admin panel: [http://localhost:3000/toyz-panel](http://localhost:3000/toyz-panel)

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm deps:check` - Check for outdated dependencies
- `pnpm deps:update` - Update dependencies
- `pnpm generate:env-key-types` - Generate TypeScript types for environment variables

## Project Structure

```
app/
├── [locale]/           # Localized public site routes
├── (payload)/          # Payload CMS: collections, globals, jobs, admin (/toyz-panel)
└── actions/            # Shared server actions (search)
components/             # Shared UI primitives
layout/                 # Header & Footer
services/               # Server-side data fetchers (Payload Local API + cache)
emails/                 # React Email templates (newsletter)
utils/                  # Shared helpers
theme/                  # Design tokens, fonts, icons
locales/                # Translation files (en, tr)
tests/                  # Vitest (unit, integration, components) & Playwright (e2e)
```

## Newsletter

When an article is published with **Send newsletter** checked, an email to all active subscribers is scheduled for ~30 minutes later (unchecking it before then cancels the send). Background jobs are run by an external cron that calls Payload's jobs endpoint with `Authorization: Bearer $CRON_SECRET`. Emails are only sent in production.

## 🧪 Testing

This project uses a multi-layered testing strategy:

### Test Types
- **Unit Tests (Vitest):** Logic and utility functions (`tests/unit`).
- **Integration Tests (Vitest):** Server Actions and Data Services (`tests/integration`).
- **E2E Tests (Playwright):** Full user journeys and UI flows (`tests/e2e`).

### Commands
- `pnpm test`: Runs all Vitest tests.
- `pnpm test:watch`: Runs Vitest in watch mode for development.
- `pnpm test:ui`: Opens Vitest UI for a visual test dashboard.
- `pnpm test:e2e`: Runs all Playwright tests in headless mode.
- `pnpm test:e2e:ui`: Opens Playwright UI (Timeline, Screenshots, Debugging).

## License

MIT License

Copyright (c) 2025 Aycan Öğüt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
