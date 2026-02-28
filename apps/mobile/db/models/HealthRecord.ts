import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, text } from "@nozbe/watermelondb/decorators";

// ─── Health Record Types ──────────────────────────────────────────────────

export type HealthRecordType =
  | "weight"
  | "vaccine"
  | "checkup"
  | "treatment"
  | "surgery"
  | "dental"
  | "other";

// ── Metadata shapes per type ──────────────────────────────────────────────

export type VaccineStatus = "scheduled" | "completed" | "overdue";

/** metadata when type = "weight" */
export interface WeightMeta {
  weightKg: number;
}

/** metadata when type = "vaccine" */
export interface VaccineMeta {
  name: string; // e.g. "Rabies", "DHPP"
  status: VaccineStatus;
  scheduledAt?: number; // Unix ms — due date (may differ from recorded_at = injected date)
  administeredAt?: number;
  batchNumber?: string;
  vetName?: string;
}

/** metadata when type = "checkup" | "treatment" | "surgery" | "dental" | "other" */
export interface VisitMeta {
  title: string; // e.g. "Annual Check-up"
  vetName?: string;
  clinic?: string;
  diagnosis?: string;
  prescription?: string;
  attachmentUris?: string[]; // local paths (pre-sync) or remote URLs (post-sync)
  cost?: number;
}

// Discriminated union — TypeScript knows the metadata shape from the type
export type HealthRecordMetadata =
  | ({ type: "weight" } & WeightMeta)
  | ({ type: "vaccine" } & VaccineMeta)
  | ({
      type: "checkup" | "treatment" | "surgery" | "dental" | "other";
    } & VisitMeta);

// ─── Model class ──────────────────────────────────────────────────────────

export class HealthRecord extends Model {
  static table = "health_records";

  @text("server_id") serverId!: string | null;
  @field("pet_id") petId!: string;
  @text("type") type!: HealthRecordType;
  @field("recorded_at") recordedAt!: number; // Unix ms — primary sort key
  @text("notes") notes!: string | null; // free-text for any type
  /** JSON-encoded HealthRecordMetadata. Use getMetadata() / helpers below. */
  @text("metadata") metadata!: string;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  // ── Typed metadata helpers ──────────────────────────────────

  getMetadata(): HealthRecordMetadata {
    const raw = JSON.parse(this.metadata) as Omit<HealthRecordMetadata, "type">;
    return { ...raw, type: this.type } as HealthRecordMetadata;
  }

  // convenience narrowed accessors

  asWeight(): ({ type: "weight" } & WeightMeta) | null {
    if (this.type !== "weight") return null;
    return this.getMetadata() as { type: "weight" } & WeightMeta;
  }

  asVaccine(): ({ type: "vaccine" } & VaccineMeta) | null {
    if (this.type !== "vaccine") return null;
    return this.getMetadata() as { type: "vaccine" } & VaccineMeta;
  }

  asVisit():
    | ({ type: VisitMeta extends infer T ? string : never } & VisitMeta)
    | null {
    if (
      this.type !== "checkup" &&
      this.type !== "treatment" &&
      this.type !== "surgery" &&
      this.type !== "dental" &&
      this.type !== "other"
    )
      return null;
    return this.getMetadata() as any;
  }
}
