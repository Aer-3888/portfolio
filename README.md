# Portfolio Théo Phan

A personal portfolio built as a project in its own right: a scroll-driven, spatial UI with
custom motion, smooth scrolling, and a minimalist editorial design. Fast on mobile, fully
keyboard accessible, and respectful of reduced-motion preferences.

**Live:** [portfolio-theo.pages.dev](https://portfolio-theo.pages.dev)

![Home page demo](docs/demo.gif)

## Highlights

- **Scroll-driven interface:** sections react to scroll position with parallax and depth, powered by [Lenis](https://github.com/darkroomengineering/lenis) smooth scrolling and Framer Motion.
- **Custom liquid navigation:** an animated blob menu morphed with SVG path interpolation ([flubber](https://github.com/veltman/flubber)).
- **Accessible by default:** focus traps in modals, full keyboard navigation, and motion disabled under `prefers-reduced-motion`.
- **Performance-first assets:** DSLR photography and screenshots are resized to WebP derivatives at build-time. The LCP hero is preloaded and fonts are loaded without blocking render.
- **SEO ready:** per-route metadata, Open Graph / Twitter cards, JSON-LD, `sitemap.xml`, and `robots.txt`.

## Tech Stack

| Area      | Choice                                                                                         |
| --------- | ---------------------------------------------------------------------------------------------- |
| Core      | [React 19](https://react.dev/) · [Vite 6](https://vitejs.dev/)                                  |
| Styling   | [Tailwind CSS v4](https://tailwindcss.com/)                                                     |
| Animation | [Framer Motion](https://www.framer.com/motion/) · [flubber](https://github.com/veltman/flubber) |
| Scroll    | [Lenis](https://github.com/darkroomengineering/lenis)                                           |
| Routing   | [React Router 7](https://reactrouter.com/)                                                      |
| Testing   | [Vitest](https://vitest.dev/) · [Testing Library](https://testing-library.com/)                 |
| Tooling   | ESLint · Prettier ·[sharp](https://sharp.pixelplumbing.com/) (image pipeline)                 |
| Hosting   | Cloudflare Pages (CI via GitHub Actions)                                                       |

## Project Structure

```
src/
  pages/          # Route-level features (home, Projects, Contact, About)
    home/         # Hero, Profile, Projects, Footer sections
  components/     # Shared UI + layout (PageNav, LiquidMenu, SmoothScroll)
  hooks/          # useMediaQuery, useSeo, useMagneticEffect, ...
  config/         # siteData.js: projects, experience, socials
scripts/          # optimize-images.mjs: WebP + OG card generation
public/images/    # Originals + optimized/ WebP derivatives
```

## Getting Started

Requires Node 20+.

```bash
npm install
npm run dev        # start the dev server
```

## Scripts

| Command                     | Description                                            |
| --------------------------- | ------------------------------------------------------ |
| `npm run dev`             | Start the Vite dev server                              |
| `npm run build`           | Production build to`dist/`                           |
| `npm run preview`         | Serve the production build locally                     |
| `npm test`                | Run the Vitest suite                                   |
| `npm run lint`            | Lint with ESLint                                       |
| `npm run format`          | Format with Prettier                                   |
| `npm run optimize:images` | Regenerate WebP derivatives, favicons, and the OG card |

## Image Pipeline

Full-resolution originals live in `public/images`. Running `npm run optimize:images` writes
resized WebP derivatives to `public/images/optimized` (and a 1200×630 social card) via
[`scripts/optimize-images.mjs`](scripts/optimize-images.mjs). The app references the
derivatives, keeping the runtime image payload small while the originals stay in the repo.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)),
which compiles the LaTeX CVs, lints, tests, builds, and deploys to Cloudflare Pages.
