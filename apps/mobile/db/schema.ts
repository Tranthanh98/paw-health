import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 2,
  tables: [
    // ─── Pet ──────────────────────────────────────────────────
    tableSchema({
      name: "pets",
      columns: [
        { name: "server_id", type: "string", isOptional: true },
        { name: "user_id", type: "string" },
        { name: "name", type: "string" },
        { name: "species", type: "string" }, // "dog" | "cat" | "other"
        { name: "breed", type: "string" },
        { name: "gender", type: "string" }, // "male" | "female"
        { name: "birthday", type: "number", isOptional: true }, // Unix ms
        { name: "weight_kg", type: "number" }, // latest snapshot — denormalized for quick display
        { name: "photo_uri", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    // ─── Health Records ───────────────────────────────────────
    //
    // Unified timeline: every health event for a pet is one record.
    //
    // `type` discriminates the event:
    //   "weight"   → metadata: WeightMeta
    //   "vaccine"  → metadata: VaccineMeta
    //   "checkup" | "treatment" | "surgery" | "dental" | "other"
    //              → metadata: VisitMeta
    //
    // `metadata` is a JSON string stored as TEXT in SQLite.
    // On the Postgres backend it maps to a JSONB column.
    //
    // Querying by type:   Q.where("type", "weight")
    // Timeline sort:      Q.sortBy("recorded_at", Q.desc)
    tableSchema({
      name: "health_records",
      columns: [
        { name: "server_id", type: "string", isOptional: true },
        { name: "pet_id", type: "string", isIndexed: true },
        { name: "type", type: "string", isIndexed: true },
        { name: "recorded_at", type: "number" }, // Unix ms — primary sort key
        { name: "notes", type: "string", isOptional: true }, // free-text notes for any type
        { name: "metadata", type: "string" }, // JSON — shape depends on `type`
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    // ─── Appointments ─────────────────────────────────────────
    //
    // Future-facing events. Once completed → create a health_record
    // and set linked_record_id to close the loop.
    tableSchema({
      name: "appointments",
      columns: [
        { name: "server_id", type: "string", isOptional: true },
        { name: "pet_id", type: "string", isIndexed: true },
        { name: "title", type: "string" },
        { name: "type", type: "string" }, // "vaccine" | "grooming" | "checkup" | "other"
        { name: "scheduled_at", type: "number" }, // Unix ms
        { name: "location", type: "string", isOptional: true },
        { name: "reminder_at", type: "number", isOptional: true },
        { name: "status", type: "string" }, // "upcoming" | "done" | "cancelled"
        { name: "linked_record_id", type: "string", isOptional: true }, // FK → health_records
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
