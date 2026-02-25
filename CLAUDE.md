# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Audity is a music streaming web app (like Spotify) built with React + TypeScript. Users can browse and play music without logging in. Authenticated users can create playlists, like content, and access their library. There is a separate admin panel for content management.

Deployed at: https://audity.dtpf.es/

## Commands

- `npm run dev` -- Start development server (port 5100, uses react-scripts/CRA)
- `npm run build` -- Production build (outputs to `build/`)
- `npm run format` -- Prettier

No test runner or linter is configured.

The backend API runs separately on port 4000 (`http://localhost:4000/api/v1`).

## Build Tool

This project uses **Create React App** (react-scripts 5.0.1) despite having Vite listed in devDependencies and a root `index.html` with Vite-style script tag. The actual CRA entry point is `public/index.html`. The root `index.html` appears to be a leftover from an attempted Vite migration.

## Architecture

### State Management: Context + useReducer

State is managed via React Context API with a useReducer pattern (NOT Redux). Each domain has:
- `context/<domain>/` -- Provider component with `createContext` + `useReducer`
- `reducers/<domain>/` -- Three files per domain:
  - `*.types.ts` -- Action type string constants
  - `*.actions.ts` -- Async action creators (call APIs, dispatch results)
  - `*.reducer.ts` -- Pure reducer function

**Context provider nesting order** (in `App.tsx`):
Auth0Provider > UserProvider > LanguageProvider > ThemeProvider > CurrentTracklistProvider > CurrentTrackProvider > MyLibraryProvider

Admin contexts (`context/admin/`) are separate and mounted only within admin routes. There are 7 admin contexts: album, artist, genre, playlist, statistic, track, user.

**Note**: Typo in `StatiticAdminProvider.tsx` (missing 's' in "Statistic") -- referenced consistently.

### Routing

React Router v6 with `createBrowserRouter`. All page components are lazy-loaded with `Suspense`.

- `/` -- BasicLayout (public pages: home, albums, artists, playlists, genres, search, explore)
- `/library` -- Protected (requires auth), uses LibraryLayout with sub-routes (highlights, favorites, playlists, uploads)
- `/settings` -- Protected profile page
- `/offers` -- Login-required page (redirects already-authenticated users away)
- `/admin/*` -- Protected admin routes, role-checked via `ProtectedAdminRoute`
  - Admin CRUD pages for: home, users, tracks, playlists, albums, artists, genres
  - Admin forms at: `/admin/track-form`, `/admin/album-form`, `/admin/artist-form`, `/admin/genre-form`, `/admin/playlist-form` (each with optional `/:id` for editing)

Route middleware in `router/router.middleware.ts` and `router/user.middleware.ts`.

### API Layer

Plain `fetch`-based API calls in `src/api/`. No axios.
- `api/music/` -- tracks, artists, albums, playlists, genres APIs
- `api/user.api.ts` -- User registration, settings, role checking
- `api/statistic.api.ts` -- Analytics endpoints
- `api/utils/config.ts` -- Base path (localhost:4000 in dev, relative in prod via `isLocalhost` check)
- `api/utils/makeRequest.js` -- Shared fetch wrapper
- `api/utils/methods.ts` -- HTTP method helpers

Auth tokens are obtained via `getAccessTokenSilently()` from Auth0 and passed as Bearer tokens.

### Import Paths

`tsconfig.json` sets `baseUrl: "src"`, so imports use absolute paths from `src/`:
```typescript
import UserProvider from "context/user/UserProvider";
import { basePath } from "api/utils/config";
```

### Styling

- SCSS/Sass with component-level `.scss` files
- Theme system: `html[data-theme='light|dark']` with CSS custom properties
- Theme variables defined in `src/sass/_variables.scss`
- Mixins in `src/sass/_mixins.scss`
- Animations in `src/sass/_animation.scss`
- Ant Design components (v5) with custom overrides
- Primary accent color: `#ef5466`
- Responsive breakpoint (mobile/desktop): **815px** (defined in `utils/componentsConstants.ts`)

### Responsive Design

Components split into desktop/mobile variants:
- `views/components/basic/desktop/` -- Desktop-specific components (sidebar, top bar, player, track list)
- `views/components/basic/mobile/` -- Mobile-specific components (sidebar, top bar, player, search, explore, track details)
- `useWindowSizeReport()` hook in `src/hooks/` for responsive width detection

### Component Naming

- Basic (user-facing) components use `BComponent` suffix (e.g., `PlayerBComponentDesktop`)
- Admin components live under `views/components/admin/`
- Pages under `views/pages/basic/` and `views/pages/admin/`
- Reusable render components in `views/components/basic/renders/` (renderTrack, renderAlbum, renderArtist, renderPlaylist, genresRender)
- UI components in `views/UI/` (spinner, theme toggle, language selector, swiper settings, playlist modals, copy URL, coming soon)
- Swiper carousels in `views/components/SwiperCarousel/` (music page, library page, tracks)

### Internationalization

i18next with English (`en`) and Spanish (`es`). Translation files in `src/assets/locale/`. Language preference persisted to DB via `updateUserLanguageAPI`. Configuration in `src/utils/i18n.ts`.

### Authentication

Auth0 with separate client IDs for development/production (selected via `isLocalhost` check in `src/utils/isLocalhost.ts`). Environment variables:
- `REACT_APP_AUTH0_DOMAIN`
- `REACT_APP_DEVELOPMENT_AUTH0_CLIENT_ID` / `REACT_APP_PRODUCTION_AUTH0_CLIENT_ID`
- `REACT_APP_AUTH0_AUDIENCE_DEVELOPMENT` / `REACT_APP_AUTH0_AUDIENCE_PRODUCTION`

### TypeScript

- Strict mode enabled with `strictNullChecks`
- `target: "es5"`, `module: "esnext"`, `jsx: "react-jsx"`
- Interfaces in `src/interfaces/` -- `music.ts`, `user.ts`, `global.ts`
- Image module declarations in `index.d.ts`
- React types declaration in `react-app-env.d.ts`
- Mixed TS/JS: some components are `.jsx` (e.g., sidebar, player progress bar, carousels, track lists)

### PWA

Service worker registration via Workbox (`src/serviceWorkerRegistration.ts`, `src/service-worker.ts`). Auto-updates on new deployments.

### Analytics

Google Analytics (G-EEHX4M6RHE) via Google Tag Manager, configured in `public/index.html`.

### SEO

`react-helmet-async` used via `HelmetSEO` component (`views/utils/HelmetSEO/`).
