import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, text } from "@nozbe/watermelondb/decorators";

export type AppointmentType = "vaccine" | "grooming" | "checkup" | "other";
export type AppointmentStatus = "upcoming" | "done" | "cancelled";

export class Appointment extends Model {
  static table = "appointments";

  @text("server_id") serverId!: string | null;
  @field("pet_id") petId!: string;
  @text("title") title!: string;
  @text("type") type!: AppointmentType;
  @field("scheduled_at") scheduledAt!: number; // Unix ms
  @text("location") location!: string | null;
  @field("reminder_at") reminderAt!: number | null;
  @text("status") status!: AppointmentStatus;
  /** FK → medical_records.id — set after converting appointment to a visit record */
  @text("linked_record_id") linkedRecordId!: string | null;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
