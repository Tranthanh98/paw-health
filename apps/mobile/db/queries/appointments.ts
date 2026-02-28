/**
 * Appointment repository
 */
import { Q } from "@nozbe/watermelondb";
import { appointmentsCollection, database } from "../index";
import type { Appointment, AppointmentType } from "../models";

// ─── Read ─────────────────────────────────────────────────────────────────

/** Observe upcoming appointments for a pet, sorted by scheduled time. */
export function observeUpcomingAppointments(petId: string) {
  return appointmentsCollection
    .query(
      Q.where("pet_id", petId),
      Q.where("status", "upcoming"),
      Q.sortBy("scheduled_at", Q.asc),
    )
    .observe();
}

/** Fetch today's appointments across all pets for the home screen. */
export async function fetchTodayAppointments(): Promise<Appointment[]> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return appointmentsCollection
    .query(
      Q.where("scheduled_at", Q.gte(startOfDay.getTime())),
      Q.where("scheduled_at", Q.lte(endOfDay.getTime())),
      Q.where("status", "upcoming"),
      Q.sortBy("scheduled_at", Q.asc),
    )
    .fetch();
}

// ─── Write ────────────────────────────────────────────────────────────────

export interface CreateAppointmentInput {
  petId: string;
  title: string;
  type: AppointmentType;
  scheduledAt: number;
  location?: string;
  reminderAt?: number;
}

export async function createAppointment(
  input: CreateAppointmentInput,
): Promise<Appointment> {
  return database.write(async () =>
    appointmentsCollection.create((a) => {
      a.petId = input.petId;
      a.title = input.title;
      a.type = input.type;
      a.scheduledAt = input.scheduledAt;
      a.location = input.location ?? null;
      a.reminderAt = input.reminderAt ?? null;
      a.status = "upcoming";
      a.linkedRecordId = null;
    }),
  );
}

export async function completeAppointment(
  appointment: Appointment,
  linkedRecordId?: string,
): Promise<Appointment> {
  return database.write(async () =>
    appointment.update((a) => {
      a.status = "done";
      if (linkedRecordId) a.linkedRecordId = linkedRecordId;
    }),
  );
}

export async function cancelAppointment(
  appointment: Appointment,
): Promise<Appointment> {
  return database.write(async () =>
    appointment.update((a) => {
      a.status = "cancelled";
    }),
  );
}

export async function deleteAppointment(
  appointment: Appointment,
): Promise<void> {
  await database.write(async () => appointment.markAsDeleted());
}
