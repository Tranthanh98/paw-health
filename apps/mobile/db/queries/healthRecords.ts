/**
 * HealthRecord repository
 *
 * One table covers every health event for a pet:
 *   weight logs, vaccine records, vet visits (checkup / treatment / surgery / dental / other)
 *
 * All writes serialise type-specific fields into `metadata` (JSON string).
 * WatermelonDB observables keep the UI reactive; no manual refresh needed.
 */
import { Q } from "@nozbe/watermelondb";
import { database, healthRecordsCollection } from "../index";
import type {
  HealthRecord,
  HealthRecordType,
  VaccineMeta,
  VaccineStatus,
  VisitMeta,
  WeightMeta,
} from "../models";

// ─── Helpers ─────────────────────────────────────────────────────────────

function encodeMeta(meta: WeightMeta | VaccineMeta | VisitMeta): string {
  return JSON.stringify(meta);
}

// ─── Read — reactive ─────────────────────────────────────────────────────

/** Full timeline for a pet, newest first. */
export function observeHealthTimeline(petId: string) {
  return healthRecordsCollection
    .query(Q.where("pet_id", petId), Q.sortBy("recorded_at", Q.desc))
    .observe();
}

/** Filtered timeline — e.g. only vaccines, only weight, etc. */
export function observeHealthByType(petId: string, type: HealthRecordType) {
  return healthRecordsCollection
    .query(
      Q.where("pet_id", petId),
      Q.where("type", type),
      Q.sortBy("recorded_at", Q.desc),
    )
    .observe();
}

// ─── Read — one-shot fetch ────────────────────────────────────────────────

/** Last N weight entries for charting, ordered oldest → newest. */
export async function fetchWeightHistory(
  petId: string,
  limit = 12,
): Promise<HealthRecord[]> {
  return healthRecordsCollection
    .query(
      Q.where("pet_id", petId),
      Q.where("type", "weight"),
      Q.sortBy("recorded_at", Q.asc),
      Q.take(limit),
    )
    .fetch();
}

/** Upcoming (scheduled) vaccines. */
export async function fetchUpcomingVaccines(
  petId: string,
): Promise<HealthRecord[]> {
  // status is inside metadata JSON — filter client-side after fetch
  const all = await healthRecordsCollection
    .query(Q.where("pet_id", petId), Q.where("type", "vaccine"))
    .fetch();

  return all.filter((r: HealthRecord) => {
    const meta = JSON.parse(r.metadata) as VaccineMeta;
    return meta.status === "scheduled";
  });
}

/** Recent vet visits (all visit types). */
export async function fetchRecentVisits(
  petId: string,
  limit = 10,
): Promise<HealthRecord[]> {
  return healthRecordsCollection
    .query(
      Q.where("pet_id", petId),
      Q.or(
        Q.where("type", "checkup"),
        Q.where("type", "treatment"),
        Q.where("type", "surgery"),
        Q.where("type", "dental"),
        Q.where("type", "other"),
      ),
      Q.sortBy("recorded_at", Q.desc),
      Q.take(limit),
    )
    .fetch();
}

// ─── Write — Weight ───────────────────────────────────────────────────────

export async function logWeight(
  petId: string,
  weightKg: number,
  recordedAt: number = Date.now(),
  notes?: string,
): Promise<HealthRecord> {
  const meta: WeightMeta = { weightKg };
  return database.write(async () =>
    healthRecordsCollection.create((r: HealthRecord) => {
      r.petId = petId;
      r.type = "weight";
      r.recordedAt = recordedAt;
      r.notes = notes ?? null;
      r.metadata = encodeMeta(meta);
    }),
  );
}

// ─── Write — Vaccine ──────────────────────────────────────────────────────

export interface CreateVaccineInput {
  petId: string;
  name: string;
  scheduledAt: number; // due date
  status?: VaccineStatus;
  administeredAt?: number;
  batchNumber?: string;
  vetName?: string;
  notes?: string;
}

export async function createVaccineRecord(
  input: CreateVaccineInput,
): Promise<HealthRecord> {
  const meta: VaccineMeta = {
    name: input.name,
    status: input.status ?? "scheduled",
    scheduledAt: input.scheduledAt,
    administeredAt: input.administeredAt,
    batchNumber: input.batchNumber,
    vetName: input.vetName,
  };
  return database.write(async () =>
    healthRecordsCollection.create((r: HealthRecord) => {
      r.petId = input.petId;
      r.type = "vaccine";
      // recorded_at = administered date if done, else scheduled date
      r.recordedAt = input.administeredAt ?? input.scheduledAt;
      r.notes = input.notes ?? null;
      r.metadata = encodeMeta(meta);
    }),
  );
}

export async function markVaccineAdministered(
  record: HealthRecord,
  administeredAt: number = Date.now(),
  batchNumber?: string,
  vetName?: string,
): Promise<HealthRecord> {
  const existing = JSON.parse(record.metadata) as VaccineMeta;
  const updated: VaccineMeta = {
    ...existing,
    status: "completed",
    administeredAt,
    ...(batchNumber ? { batchNumber } : {}),
    ...(vetName ? { vetName } : {}),
  };
  return database.write(async () =>
    record.update((r: HealthRecord) => {
      r.recordedAt = administeredAt;
      r.metadata = encodeMeta(updated);
    }),
  );
}

// ─── Write — Vet Visit ────────────────────────────────────────────────────

export interface CreateVisitInput {
  petId: string;
  type: "checkup" | "treatment" | "surgery" | "dental" | "other";
  visitedAt: number;
  title: string;
  vetName?: string;
  clinic?: string;
  diagnosis?: string;
  prescription?: string;
  attachmentUris?: string[];
  cost?: number;
  notes?: string;
}

export async function createVisitRecord(
  input: CreateVisitInput,
): Promise<HealthRecord> {
  const meta: VisitMeta = {
    title: input.title,
    vetName: input.vetName,
    clinic: input.clinic,
    diagnosis: input.diagnosis,
    prescription: input.prescription,
    attachmentUris: input.attachmentUris,
    cost: input.cost,
  };
  return database.write(async () =>
    healthRecordsCollection.create((r: HealthRecord) => {
      r.petId = input.petId;
      r.type = input.type;
      r.recordedAt = input.visitedAt;
      r.notes = input.notes ?? null;
      r.metadata = encodeMeta(meta);
    }),
  );
}

export async function updateVisitRecord(
  record: HealthRecord,
  input: Partial<Omit<CreateVisitInput, "petId" | "type">>,
): Promise<HealthRecord> {
  const existing = JSON.parse(record.metadata) as VisitMeta;
  const updated: VisitMeta = {
    ...existing,
    ...(input.title !== undefined ? { title: input.title } : {}),
    ...(input.vetName !== undefined ? { vetName: input.vetName } : {}),
    ...(input.clinic !== undefined ? { clinic: input.clinic } : {}),
    ...(input.diagnosis !== undefined ? { diagnosis: input.diagnosis } : {}),
    ...(input.prescription !== undefined
      ? { prescription: input.prescription }
      : {}),
    ...(input.attachmentUris !== undefined
      ? { attachmentUris: input.attachmentUris }
      : {}),
    ...(input.cost !== undefined ? { cost: input.cost } : {}),
  };
  return database.write(async () =>
    record.update((r: HealthRecord) => {
      if (input.visitedAt !== undefined) r.recordedAt = input.visitedAt;
      if (input.notes !== undefined) r.notes = input.notes ?? null;
      r.metadata = encodeMeta(updated);
    }),
  );
}

// ─── Delete ───────────────────────────────────────────────────────────────

export async function deleteHealthRecord(record: HealthRecord): Promise<void> {
  await database.write(async () => record.markAsDeleted());
}
