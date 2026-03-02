## Context

The health screen is the primary pet health dashboard in the mobile app. It displays pet info, vaccination schedule, weight trend chart, and medical records. All data is currently hardcoded in `components/health/constants.ts`.

The WatermelonDB layer (`db/`) already provides:

- `Pet` model with `name`, `species`, `breed`, `gender`, `birthday` (Unix ms), `weightKg`, `photoUri`
- `HealthRecord` model with discriminated `type` field and JSON `metadata`
- Reactive queries (`observePets`, `observeHealthByType`) and one-shot fetches (`fetchWeightHistory`, `fetchUpcomingVaccines`, `fetchRecentVisits`)

The component prop types (`components/health/types.ts`) use a different shape than DB models (e.g. `age: string`, `weight: string`, `vaccineCount/vaccineTotal`). A mapping layer is needed.

## Goals / Non-Goals

**Goals:**

- Wire the health screen to live WatermelonDB data via a single custom hook
- Keep all existing component interfaces unchanged (no breaking prop changes)
- Use WatermelonDB's `observe()` for reactive updates (pet list, vaccines, weight, records update in real-time)
- Derive computed fields (age from birthday, weight string from `weightKg`, vaccine counts from records)

**Non-Goals:**

- Changing component UI/design
- Adding write operations (log weight, add vaccine) — these are separate features
- Server sync changes — sync layer is already built
- Changing the DB schema

## Decisions

### 1. Single hook vs multiple hooks

**Decision:** Single `useHealthScreenData(userId, selectedPetId)` hook that returns all data the screen needs.
**Rationale:** The health screen is one cohesive view. A single hook avoids prop-drilling and keeps the screen component thin. Internally, the hook composes multiple WatermelonDB subscriptions.

### 2. Mapping layer location

**Decision:** Co-locate mappers inside the hook file (`useHealthScreenData.ts`) as pure functions.
**Rationale:** These mappers are health-screen-specific (e.g. formatting age as "3 tuổi"). If reuse emerges later, they can be extracted. Keeps change minimal.

### 3. Reactive vs one-shot queries

**Decision:** Use `observePets` for the pet list and `observeHealthByType` for vaccines/records. Use `fetchWeightHistory` one-shot (refetched when `selectedPetId` changes) since chart data doesn't need frame-level reactivity.
**Rationale:** Observables auto-refresh when DB writes occur (e.g. after sync or local mutation). Weight history is read once per pet selection to avoid unnecessary re-renders on the chart.

### 4. WatermelonDB subscription pattern

**Decision:** Use `useEffect` + `Observable.subscribe()` from RxJS (WatermelonDB's native observable API) with manual state management via `useState`.
**Rationale:** WatermelonDB queries return RxJS `Observable`s. Using `subscribe` directly is the most lightweight approach without adding extra dependencies like `@nozbe/with-observables` HOC. The hook cleans up subscriptions in the effect teardown.

### 5. Vaccine count derivation

**Decision:** Count vaccine records by status (`completed` vs total) from the pet's health records.
**Rationale:** The DB doesn't store aggregate vaccine counts. Counting from records is accurate and stays in sync automatically.

## Risks / Trade-offs

- **Empty state on first launch:** DB will be empty until sync completes or user creates data. The screen should gracefully handle empty arrays. Mitigation: The hook returns empty arrays/defaults; components already render gracefully with empty lists.
- **Performance of client-side vaccine filtering:** `fetchUpcomingVaccines` fetches all vaccine records then filters in JS. For typical pet owners (< 50 vaccine records per pet), this is negligible.

## Open Questions

None — the DB layer and component interfaces are well-defined. Mapping is straightforward.
