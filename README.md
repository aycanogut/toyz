# TOYZ

A collective and webzine platform about graffiti, street art, underground music, skateboarding, cinema, photography, and art — all rooted in counter-culture.

## Tech Stack

- **Next.js 15** - React framework
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
- pnpm 10.21.0 or higher
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
```

4. Generate environment variable types:

```bash
pnpm run generateEnvKeyTypes
```

5. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.  
Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm generateEnvKeyTypes` - Generate TypeScript types for environment variables

## Project Structure

```
app/
├── [locale]/     # Localized app routes
└── (payload)/          # Payload CMS routes
components/             # Shared UI components
locales/                # Translation files
```

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
