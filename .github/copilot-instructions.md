# Copilot Instructions for paw-health

## Monorepo architecture

- This repo uses `pnpm` workspaces (`apps/*`, `packages/*`) with Turborepo orchestration.
- App boundaries:
  - `apps/api`: Express API + Better Auth server.
  - `apps/web`: Next.js app (App Router) on port `3000`.
  - `apps/landing`: Next.js landing app on port `3002`.
  - `apps/mobile`: Expo Router + NativeWind mobile app.
  - `packages/typescript-config`: shared TS presets.
- Prefer scoped changes inside one app unless modifying a shared contract (auth/env/API response shape).

## Critical integration contracts

- API auth entry is mounted at `/api/auth/*` in `apps/api/src/index.ts` via `toNodeHandler(auth)`.
- Better Auth server config lives in `apps/api/src/lib/auth.ts` and requires `BETTER_AUTH_SECRET`.
- Web client auth uses `createAuthClient` in `apps/web/src/lib/auth-client.ts` with `NEXT_PUBLIC_API_URL` fallback to `http://localhost:3001`.
- API CORS reads `ALLOWED_ORIGINS` as comma-separated values; keep credentials-compatible origin handling.

## Mobile (Expo SDK 54) rules

- Keep Babel config shape in `apps/mobile/babel.config.js`:
  - `"nativewind/babel"` must stay in `presets` (not in `plugins`).
- NativeWind Metro integration must remain wrapped by `withNativeWind` in `apps/mobile/metro.config.js`.
- `apps/mobile/app.json` references required assets under `assets/images/` (`icon.png`, `adaptive-icon.png`, `favicon.png`); don’t remove these files.
- Theme tokens are defined in `apps/mobile/tailwind.config.js` (`primary`, `secondary`, `accent`, `background`, `surface`, `text.*`, `error`, `success`). Use these tokens instead of hardcoded colors in mobile screens.

## Shared mobile UI components

- Reuse existing common components in `apps/mobile/components/ui` before creating new ones.
- Current shared exports are centralized at `apps/mobile/components/ui/index.ts` (`ThemeText`, `Card`, `Pill`, `Button`).
- Preferred order when implementing UI:
  1. Reuse an existing common component.
  2. Extend that component with small, backwards-compatible props.
  3. Create a new common component only if the pattern appears in multiple screens.
- For screen code under `apps/mobile/app/**`, avoid redefining one-off button/card/text primitives when an equivalent shared component exists.
- Keep iOS-like rounded style consistent (`rounded-full` for pills/buttons, large radius cards) and keep all colors mapped to theme tokens.

## Developer workflows

- Install dependencies once at repo root: `pnpm install` (do not install per app manually).
- Primary root scripts:
  - `pnpm dev:api|dev:web|dev:landing|dev:mobile`
  - `pnpm build`, `pnpm build:api|build:web|build:landing`
  - `pnpm lint`, `pnpm lint:*`, `pnpm format`
- Add dependencies from root using scoped helpers:
  - `pnpm run add:web -- <pkg>`
  - `pnpm run add:api:dev -- <pkg>`
  - `pnpm run add:root -- <pkg>`
- Validate mobile compatibility changes with `npx expo-doctor` in `apps/mobile`.

## Conventions and implementation patterns

- TypeScript is strict across apps; preserve existing tsconfig inheritance and path aliases.
- Alias usage differs by app:
  - Mobile `@/*` -> project root (`apps/mobile/tsconfig.json`).
  - Web `@/*` -> `src/*` (`apps/web/tsconfig.json`).
- Keep App Router/Expo Router layout structure intact:
  - Web/Landing: `src/app/layout.tsx`, `src/app/page.tsx`
  - Mobile: `app/_layout.tsx`, `app/(tabs)/_layout.tsx`
- Prefer small, surgical edits and avoid introducing new frameworks or folder restructures unless explicitly requested.
