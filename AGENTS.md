# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite-powered React 18 and TypeScript single-page application. Application startup and routing live in `src/main.tsx` and `src/App.tsx`. Put route-level and shared React components in `src/components/`; shadcn/Radix primitives belong in `src/components/ui/`. Redux state is under `src/store/`, while API clients, types, and shared helpers live in `src/lib/`. Global styling is split across `src/globals.css`, `src/index.css`, and `src/App.css`, with Tailwind configured in `tailwind.config.js`. Static images, videos, metadata files, and Markdown posts are served from `public/`. Maintenance utilities belong in `scripts/`.

## Build, Test, and Development Commands

Use pnpm because `pnpm-lock.yaml` is committed.

- `pnpm install` installs exact locked dependencies.
- `pnpm dev` starts the Vite development server with hot reload.
- `pnpm build` runs strict TypeScript checks, then creates the production bundle in `dist/`.
- `pnpm lint` checks TypeScript, React Hooks, and unused directives.
- `pnpm test` runs the Vitest suite once; `pnpm test:watch` keeps it running locally.
- `pnpm check` runs linting, type checks, tests, and the production build in CI order.
- `pnpm preview` serves the production bundle locally for final verification.
- `pnpm generate-sitemap` regenerates `public/sitemap.xml`; review the resulting date and routes before committing.

## Coding Style & Naming Conventions

Follow the existing TS/TSX style: two-space indentation, single quotes, and no semicolons. Use PascalCase for React components and their files (`LandingPage.tsx`), camelCase for functions and variables, and `use...` for hooks. Prefer the `@/` alias for imports from `src/`. Keep components functional, keep route declarations centralized in `App.tsx`, and use existing Tailwind tokens and UI primitives before adding one-off CSS.

## Testing Guidelines

Vitest and React Testing Library cover component and state regressions. Colocate tests as `*.test.ts` or `*.test.tsx`; focus on observable behavior and mock network boundaries. Payment changes must retain tests for the order payload and empty-route recovery. Run `pnpm check` before every pull request, then exercise affected routes and responsive layouts through `pnpm dev`. No numeric coverage threshold is enforced; prioritize authentication, payment, and content-loading paths.

## Commit & Pull Request Guidelines

Recent history uses concise Conventional Commit-style subjects, predominantly `feat: <Chinese summary>`. Use an appropriate type such as `feat:`, `fix:`, `docs:`, or `chore:` and describe one focused change. Pull requests should explain user-visible impact, list verification commands, link related issues, and include before/after screenshots for UI changes. Call out changes to API behavior, payment flows, analytics, SEO metadata, or generated sitemap files explicitly.
