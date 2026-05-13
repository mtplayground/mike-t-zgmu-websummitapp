# Product Snapshot

## What this project is
SummitNav is a mobile-first Web Summit companion app built with Vite, React, TypeScript, and Tailwind CSS.

## What it does today
- Renders a single routed experience at `/` for the conference agenda.
- Loads agenda data from `public/agenda.json` at startup.
- Validates that data with Zod before route content renders.
- Shows loading and error states if agenda data is unavailable or invalid.
- Displays a time-sorted session list with:
  - day tabs derived from the loaded data
  - track filter chips
  - stage filter chips
  - debounced text search across session title, description, and speaker name
- Session cards are intentionally inert for now; there is no detail route yet.

## Current data model
- Top-level `Agenda`
- `Session`
- `Speaker`
- `Stage`
- Supporting agenda day and session format types

The fixture data currently represents two event days with multiple tracks, stages, speakers, and sessions.

## Architecture
- `src/router/`: React Router setup
- `src/components/layout/`: shared app shell
- `src/features/agenda/`: agenda-specific types, schema, context, page, and UI components
- `public/agenda.json`: current source of agenda fixture data

Key decisions:
- Keep the app as a single-page React app with a shared layout and nested route content.
- Treat agenda data as a typed contract validated at runtime with Zod.
- Fetch agenda data once through `AgendaProvider` and expose it through `useAgenda()`.
- Keep page-level UI state such as selected day, filters, and search inside the agenda page rather than the provider.

## UI conventions
- Tailwind is the primary styling system.
- The app is mobile-first, with a persistent header and bottom navigation shell.
- Only the Agenda tab exists today; navigation is structured to accept more routes later.

## Developer conventions
- Dev server: `npm run dev` on `0.0.0.0:8080`
- Quality checks:
  - `npm run lint`
  - `npm run format:check`
  - `npm run build`
