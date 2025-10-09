# Petslike Front

Angular 18 implementation of the Petslike social network experience originally prototyped in React/Vite. The project is structured with standalone components, feature-based routing, and a small mock data layer so the UI feels complete without a backend.

## Getting started

```bash
npm install
npm start
```

The dev server runs at [http://localhost:4200](http://localhost:4200). All feature routes are lazy-loaded, so the first load focuses on the feed experience while the remaining pages stream in as users navigate.

## Project structure

- `src/app/app.component.*` – top level shell handling layout, sidebar toggling, and bootstrapping authentication state.
- `src/app/app.routes.ts` – central routing table with lazy imports for each page.
- `src/app/core` – shared services, mock storage implementation, and navigation definitions.
- `src/app/features` – page-level standalone components (feed, explore, adoption, places, services, community, profile) with their child components.
- `src/app/shared` – reusable UI pieces such as the sidebar, mobile header, loading screen, and placeholder "coming soon" page.
- `src/app/data` – seed data for posts, places, pets, and community stats.

## Available scripts

| Command | Description |
| ------- | ----------- |
| `npm start` | Runs the Angular dev server with HMR. |
| `npm run build` | Builds the production bundle. |
| `npm test` | Placeholder for Karma unit tests (not configured with suites yet). |

## Styling

Global styles live in `src/styles.scss` and focus on layout primitives. Feature and component specific styles stay co-located next to their TypeScript and template files for easier maintenance.

## Notes

- All persistent state is simulated via `localStorage` through the `StorageService` wrapper.
- The project uses [lucide-angular](https://github.com/lucide-icons/lucide) for iconography to mirror the original React design.
- Bundle size warnings during build stem from Angular's default CSS budget for component styles; they do not affect runtime behavior.

