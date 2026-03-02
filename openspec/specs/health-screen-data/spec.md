# health-screen-data Specification

## Purpose
TBD - created by archiving change integrate-health-screen-db. Update Purpose after archive.
## Requirements
### Requirement: Reactive Pet List from Database

The health screen SHALL display the user's pets from WatermelonDB using a reactive observable subscription, so that the pet selector updates automatically when pets are added, modified, or deleted.

#### Scenario: Pets loaded from database

- **WHEN** the health screen mounts with an authenticated user
- **THEN** the pet list is populated from `observePets(userId)` via WatermelonDB
- **AND** the first pet is auto-selected if no pet is currently selected

#### Scenario: Pet list updates reactively

- **WHEN** a pet is created or deleted in the database (e.g. after sync)
- **THEN** the pet selector re-renders with the updated list without manual refresh

### Requirement: Pet Info Derived from Database Model

The health screen SHALL derive display fields (age, formatted weight, vaccine counts) from the database `Pet` model and related `HealthRecord` entries, mapping them to the component view type.

#### Scenario: Age computed from birthday

- **WHEN** a pet has a `birthday` timestamp
- **THEN** the displayed age is computed as the difference from the current date (e.g. "3 tuổi")

#### Scenario: Pet has no birthday

- **WHEN** a pet's `birthday` field is null
- **THEN** the age displays a fallback (e.g. empty string or "Unknown")

#### Scenario: Vaccine count derived from records

- **WHEN** the selected pet has vaccine-type health records
- **THEN** `vaccineCount` reflects the number of completed vaccines and `vaccineTotal` reflects all vaccine records for that pet

### Requirement: Reactive Vaccine Display

The health screen SHALL display upcoming vaccinations from the database using vaccine-type health records with `scheduled` status, updating reactively.

#### Scenario: Upcoming vaccines shown

- **WHEN** the selected pet has health records of type `vaccine` with status `scheduled`
- **THEN** they are displayed in the Upcoming Vaccinations section with name and due date

#### Scenario: No upcoming vaccines

- **WHEN** the selected pet has no scheduled vaccine records
- **THEN** the vaccine section renders empty (no crash, no mock data)

### Requirement: Weight History from Database

The health screen SHALL display the weight trend chart using weight-type health records from the database, sorted chronologically.

#### Scenario: Weight chart populated

- **WHEN** the selected pet has weight-type health records
- **THEN** the `WeightLineChart` receives entries with month labels and weight values, ordered oldest to newest

#### Scenario: No weight records

- **WHEN** the selected pet has no weight-type health records
- **THEN** the chart section handles empty data gracefully (empty chart or hidden)

### Requirement: Medical Records from Database

The health screen SHALL display recent medical records (vet visits) from the database, derived from visit-type health records (checkup, treatment, surgery, dental, other).

#### Scenario: Visit records displayed

- **WHEN** the selected pet has visit-type health records
- **THEN** they appear in the Medical Records section with title, formatted date, and vet name

#### Scenario: No visit records

- **WHEN** the selected pet has no visit-type records
- **THEN** the Medical Records section renders empty

### Requirement: Mock Data Removal

The health screen SHALL NOT import or use hardcoded mock data constants (`MOCK_PETS`, `MOCK_VACCINES`, `WEIGHT_HISTORY`, `MOCK_MEDICAL_RECORDS`). All displayed data MUST originate from the WatermelonDB database.

#### Scenario: No mock data in health screen

- **WHEN** inspecting the health screen source code
- **THEN** no mock constant imports exist and all data flows through the database hook

