## 1. Data Hook & Mappers

- [x] 1.1 Create `apps/mobile/components/health/useHealthScreenData.ts` with mapper functions:
  - `mapPetToView(dbPet: DbPet) → ViewPet` — derives `age` from `birthday`, formats `weight` string from `weightKg`, computes `vaccineCount`/`vaccineTotal`
  - `mapVaccineToView(record: HealthRecord) → Vaccine` — extracts `name` and `dueDate` from vaccine metadata
  - `mapWeightToView(record: HealthRecord) → WeightHistoryEntry` — extracts `date` (month label) and `value` from weight metadata
  - `mapVisitToView(record: HealthRecord) → MedicalRecord` — extracts `title`, `date`, `vet` from visit metadata
- [x] 1.2 Implement `useHealthScreenData(userId: string, selectedPetId: string | null)` hook:
  - Subscribe to `observePets(userId)` → mapped pet list
  - Subscribe to `observeHealthByType(petId, "vaccine")` → mapped vaccines (filtered to `scheduled` status for upcoming)
  - Subscribe to `observeHealthByType(petId, "weight")` → mapped weight history (sorted asc, last N entries)
  - Subscribe to visit-type records → mapped medical records
  - Return `{ pets, selectedPet, vaccines, weightHistory, medicalRecords, isLoading }`
- [x] 1.3 Re-export hook from `apps/mobile/components/health/index.ts`

## 2. DB Query Addition

- [x] 2.1 Add `observeVaccinesByPet(petId)` reactive query in `db/queries/healthRecords.ts` (wraps `observeHealthByType` for vaccine type)
- [x] 2.2 Add `observeVisitsByPet(petId, limit?)` reactive query for visit-type records

## 3. Health Screen Integration

- [x] 3.1 Update `apps/mobile/app/(tabs)/health.tsx`:
  - Remove all mock data imports (`MOCK_PETS`, `MOCK_VACCINES`, `WEIGHT_HISTORY`, `MOCK_MEDICAL_RECORDS`)
  - Import and call `useHealthScreenData` hook
  - Wire hook outputs to existing component props
  - Handle loading state (optional skeleton/spinner while DB loads)
- [x] 3.2 Handle empty state gracefully (no pets yet, no records)

## 4. Cleanup

- [x] 4.1 Remove unused mock constants from `components/health/constants.ts` (keep file if other exports remain, delete if empty)
- [x] 4.2 Update `components/health/index.ts` — remove re-exports of deleted mock constants

## 5. Verification

- [x] 5.1 Verify TypeScript compilation passes (`pnpm lint` or `tsc --noEmit` in mobile app)
- [x] 5.2 Manually test on simulator: health screen loads with DB data (or empty state if no data)
