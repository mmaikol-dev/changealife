# UI Revamp — "Quiet Luxury" Pass

A presentation-layer refresh of the Change A Life site into a sleeker,
premium aesthetic. No routes, controllers, models, migrations, validation,
auth, API, or props changed — every existing behaviour is preserved.

## Stack at a glance

- Laravel 13 + Inertia 3 + React 19 + TypeScript
- Tailwind v4 (CSS-first `@theme`, no `tailwind.config`)
- Vite (`vite-plus`, React Compiler on)
- Motion: **Lenis** (smooth scroll) + **GSAP / ScrollTrigger** + **Motion**
  (`motion/react`) + **framer-motion** (existing)
- **React Bits** components vendored under `resources/js/components/`

## Design tokens (`resources/css/app.css`)

The `@theme` block defines the quiet-luxury vocabulary, on top of the
existing brand palette (`brand-*` plum, `sun-*` amber, `cream`, `ink`):

| Token | Purpose |
| --- | --- |
| `surface`, `surface-raised` | page / card backgrounds |
| `hairline`, `hairline-strong` | 1px borders and dividers |
| `ink-deep` | deepest text / dark surfaces |
| `gold`, `gold-soft` | accent alias — **do not name this `accent`** |
| `shadow-soft`, `shadow-lift`, `shadow-glow` | layered depth |
| `radius-xl/2xl/3xl` | generous corners |
| `text-hero`, `text-display` | fluid `clamp()` display type |

> **Trap:** shadcn already owns `--accent` / `--color-accent`. Naming a site
> token `accent` silently re-tints every `bg-accent` hover state (selects,
> dropdowns). Use `gold` for the amber accent.

Global polish lives below the theme: a full-viewport film grain (`body::after`),
one `:focus-visible` treatment, refined selection, and a thin scrollbar.

## Motion system

- `resources/js/site/motion.ts` — shared easing (`siteEase`), viewport,
  `siteDuration`, `siteStagger`, `siteScrub`, `siteRevealDistance`, and the
  reduced-motion helpers `useMotionSafe()` / `prefersReducedMotion()`.
- `resources/js/components/site/smooth-scroll.tsx` — the **single** Lenis
  instance, mounted once in `app.tsx`. GSAP's ticker drives Lenis and
  ScrollTrigger is kept in sync; Inertia `navigate`/`finish` reset scroll and
  refresh triggers. Lenis is skipped for `prefers-reduced-motion`.
- **Rule:** Lenis is the only smooth-scroll layer. Never add a second one.
  Any element with its own scroll area must carry `data-lenis-prevent`
  (already applied to `ui/dialog`, `ui/sheet`, `ui/select`, `ui/sidebar`).

## React Bits usage

Installed in `resources/js/components/` (registry:
`@react-bits` → `https://reactbits.dev/r/{name}.json`):

`AnimatedContent`, `Aurora`, `BlurText`, `CountUp`, `GradientText`,
`Magnet`, `ScrollReveal`, `ScrollStack`, `ScrollVelocity`, `ShinyText`,
`SplitText`, `SpotlightCard`.

Wired so far:

- `SplitText` — hero headline and interior headings, via the shared
  `resources/js/components/site/reveal-heading.tsx`. It falls back to a plain
  heading for rich (JSX) titles or reduced motion.
- `Aurora` — lazily-loaded ambient layer in the hero, **desktop only**
  (`lg+`), with the lightweight CSS aurora as the mobile/reduced-motion
  fallback. Split into its own ~50 kB chunk.

### Adding a text effect

Use `RevealHeading` rather than `BlurText` on semantic headings — `BlurText`
renders a `<p>` and is invalid inside `<h1>`–`<h6>`. `SplitText` accepts a
`tag`, so it keeps correct semantics.

Keep text effects to a budget of ~3 per page, and gate every effect on
`useMotionSafe()`.

## Phases

1. **Foundation** — tokens, global polish, motion constants, Lenis wiring,
   `data-lenis-prevent`, React Bits install.
2. **Shared chrome** — `RevealHeading`, heading reveals in `SectionHeading`
   / `PageHeader`, card depth tokens.
3. **Home hero** — `SplitText` headline + lazy `Aurora`. *(review gate)*
4. **Interior pages** — cards and surfaces migrated to `hairline` /
   `shadow-soft` / `shadow-lift`.
5. **App / auth screens** — brand-cohesive `--primary` / `--ring`; heavy
   effects deliberately excluded (tokens + micro-interactions only).
6. **Docs** — this file.

## Verification

Run after any UI change:

```bash
npm run types:check   # tsc --noEmit
npm run check         # vp check (lint + format) — use check:fix to autofix
npm run build         # vp build
```

`php artisan test` currently fails at baseline for an unrelated environment
reason (`phpunit.xml` uses SQLite but only `pdo_mysql` is installed). Leave
`phpunit.xml` as-is.
