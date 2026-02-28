/**
 * WatermelonDB initialisation
 *
 * ⚠️  The SQLite adapter uses WatermelonDB's own native module.
 *    → Run `expo run:ios` or `expo run:android` (development build) instead of Expo Go.
 *    → For EAS builds use the `development` profile.
 */
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { Appointment, HealthRecord, Pet } from "./models";
import { schema } from "./schema";

const adapter = new SQLiteAdapter({
  schema,
  // migrations: migrations, // uncomment when you add schema migrations
  jsi: true, // enables JSI for better performance on native
  onSetUpError: (error) => {
    // Surface DB errors during development
    console.error("[WatermelonDB] setup error:", error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Pet, HealthRecord, Appointment],
});

// Convenience accessors
export const petsCollection = database.get<Pet>("pets");
export const healthRecordsCollection =
  database.get<HealthRecord>("health_records");
export const appointmentsCollection = database.get<Appointment>("appointments");
