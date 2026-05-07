# Component Rules

- **One component per file** — never define multiple function components in the same file. Extract sub-components into their own files.
- **No inline interfaces** — never use inline object types like `{ logo: "artimiz" | "oyun" }` in function parameters. Use a named `interface` instead.
- **No empty interfaces** — never define an empty `interface Foo extends Bar {}` just to name a type.
- **Use `interface` over `type`** for component props and object shapes.
- **Component prop interfaces must end with `Props`** — name them `FooProps`, never `FooInterface`, `FooConfig`, or bare `Foo`. Data/model interfaces (e.g. Payload-generated `Article`) are exempt.
- **Use semantic HTML elements** — prefer `<article>`, `<section>`, `<header>`, `<nav>`, `<dl>/<dt>/<dd>`, `<ul>/<li>`, etc. over generic `<div>` and `<span>` wherever the content has inherent meaning. Add ARIA roles (`role="columnheader"`, `aria-hidden`, etc.) for table-like structures that cannot use native `<table>`.
- **No inline SVG for icons** — never use raw `<svg>` elements for icons. Always use the `Icon` component from `@/components/Icon` with the appropriate `name` prop (e.g. `<Icon name="play-fill" />`). Available icon names are defined in `theme/icons.ts` (powered by `react-icons`).
- **Import React types directly** — use `import { ChangeEvent } from "react"` not `React.ChangeEvent`. Always prefer named imports over namespace access.
- **No JSX in variables** — never assign JSX to a variable (`const foo = <div>...</div>`) and then reference it later. JSX must be written inline so the render tree reads top-to-bottom without indirection.
- **Use `article` for card components** and **`h5` for card headings**.
- **Routing helpers** — import `Link`, `redirect`, `usePathname`, `useRouter` from `@/i18n/routing`, **never** from `next/navigation`.

## Project layout

- `app/[locale]/` — Public site (App Router + `next-intl`). Locales: `en`, `tr`.
- `app/[locale]/components/` — Page-level components consumed by `page.tsx` files.
- `app/(payload)/` — Payload CMS code (collections, globals, blocks, fields, jobs). Admin UI mounted at `/toyz-panel`.
- `app/actions/` — Server actions (contact form, subscribe, etc.).
- `layout/Header/`, `layout/Footer/` — Site chrome (desktop + mobile variants live inside).
- `components/` — Reusable UI primitives (`Badge`, `Button`, `FilterPill`, `Icon`, `Input`, `Popover`).
- `services/` — Server-side data fetchers backed by the Payload Local API (`utils/payloadClient.ts`).
- `utils/` — Shared utilities (`cn`, `formatDate`, `readTime`, `extractLexicalText`, `verifyReCaptcha`, `payloadClient`).
- `theme/` — Design tokens (`globals.css`, `animations.css`, `fonts.ts`, `icons.ts`).
- `toyzConfig.ts` — Centralized env access. Import from here instead of reading `process.env` directly.
