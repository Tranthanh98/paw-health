# Change: Integrate Health Screen with WatermelonDB

## Why

The health screen (`apps/mobile/app/(tabs)/health.tsx`) currently renders hardcoded mock data (`MOCK_PETS`, `MOCK_VACCINES`, `WEIGHT_HISTORY`, `MOCK_MEDICAL_RECORDS`). A full WatermelonDB layer already exists (`apps/mobile/db/`) with models, schema, and query functions for `Pet`, `HealthRecord`, and `Appointment`. The screen needs to consume live, reactive data from the local DB instead of static constants.

## What Changes

- Create a custom React hook (`useHealthScreenData`) that wires WatermelonDB observables to the health screen, mapping DB models to the component-level view types.
- Add mapper/adapter utilities to convert DB `Pet` → component `Pet`, DB `HealthRecord` (type=vaccine) → `Vaccine`, DB `HealthRecord` (type=weight) → `WeightHistoryEntry`, and DB visit records → `MedicalRecord`.
- Update `health.tsx` to call the new hook instead of importing mock constants.
- Add an `observeVaccinesByPet` query to `db/queries/healthRecords.ts` for reactive vaccine observation (currently only `fetchUpcomingVaccines` exists as a one-shot).
- Keep existing component interfaces (`PetSelector`, `PetInfoCard`, `VaccinesSection`, `WeightLineChart`, `MedicalRecordsSection`) unchanged — the mapping layer adapts DB shapes to the view types they already expect.

## Impact

- Affected specs: (none yet — this is the first spec)
- Affected code:
  - `apps/mobile/app/(tabs)/health.tsx` — replace mock imports with hook
  - `apps/mobile/db/queries/healthRecords.ts` — add reactive vaccine query
  - New file: `apps/mobile/components/health/useHealthScreenData.ts` — hook + mappers
  - `apps/mobile/components/health/index.ts` — re-export hook
