/**
 * Health Screen Data Hook
 *
 * Wires WatermelonDB models to the health screen's component view types.
 * Uses reactive observables for pets, vaccines, and records; one-shot fetch for weight history.
 */
import type { Pet as DbPet, HealthRecord } from "@/db/models";
import {
  fetchWeightHistory,
  observePets,
  observeVaccinesByPet,
  observeVisitsByPet,
} from "@/db/queries";
import { useUIStore } from "@/stores/uiStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type {
  MedicalRecord,
  Vaccine,
  Pet as ViewPet,
  WeightHistoryEntry,
} from "./types";

// ─── Mapper Functions ─────────────────────────────────────────────────────

/**
 * Map database Pet → component view Pet.
 * Derives age from birthday, formats weight, computes vaccine counts.
 */
function mapPetToView(
  dbPet: DbPet,
  vaccineRecords: HealthRecord[],
  t: (key: string) => string,
): ViewPet {
  // Compute age
  let age = "";
  if (dbPet.birthday) {
    const years = Math.floor(
      (Date.now() - dbPet.birthday) / (1000 * 60 * 60 * 24 * 365.25),
    );
    age = `${years} ${t("common.yearsOld")}`;
  }

  // Compute vaccine counts
  const vaccineCount = vaccineRecords.filter((r) => {
    const meta = JSON.parse(r.metadata);
    return meta.status === "completed";
  }).length;
  const vaccineTotal = vaccineRecords.length;

  return {
    id: dbPet.id,
    name: dbPet.name,
    breed: dbPet.breed,
    gender: dbPet.gender,
    age,
    weight: `${dbPet.weightKg} kg`,
    vaccineCount,
    vaccineTotal,
    petImage: dbPet.photoUri ?? undefined,
  };
}

/**
 * Map vaccine-type HealthRecord → component Vaccine.
 */
function mapVaccineToView(record: HealthRecord): Vaccine {
  const meta = JSON.parse(record.metadata);
  // Format due date — use scheduledAt from metadata
  const dueDate = meta.scheduledAt
    ? new Date(meta.scheduledAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";

  return {
    id: record.id,
    name: meta.name,
    dueDate,
  };
}

/**
 * Map weight-type HealthRecord → component WeightHistoryEntry.
 */
function mapWeightToView(record: HealthRecord): WeightHistoryEntry {
  const meta = JSON.parse(record.metadata);
  // Format date as short month label
  const date = new Date(record.recordedAt).toLocaleDateString("en-US", {
    month: "short",
  });

  return {
    date,
    value: meta.weightKg,
  };
}

/**
 * Map visit-type HealthRecord → component MedicalRecord.
 */
function mapVisitToView(record: HealthRecord): MedicalRecord {
  const meta = JSON.parse(record.metadata);
  // Format date
  const date = new Date(record.recordedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return {
    id: record.id,
    title: meta.title,
    date,
    vet: meta.vetName ?? "",
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────

interface HealthScreenData {
  pets: ViewPet[];
  selectedPet: ViewPet | null;
  vaccines: Vaccine[];
  weightHistory: WeightHistoryEntry[];
  medicalRecords: MedicalRecord[];
  isLoading: boolean;
}

/**
 * Main data hook for the health screen.
 * Subscribes to WatermelonDB observables and maps data to component view types.
 */
export function useHealthScreenData(
  userId: string,
  selectedPetId: string | null,
): HealthScreenData {
  const { t } = useTranslation();
  const petDataVersion = useUIStore((state) => state.petDataVersion);

  const [pets, setPets] = useState<ViewPet[]>([]);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [weightHistory, setWeightHistory] = useState<WeightHistoryEntry[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Observe all user's pets
  useEffect(() => {
    const subscription = observePets(userId).subscribe((dbPets) => {
      // For each pet, we need vaccine records to compute counts
      // We'll fetch them in a separate effect per pet
      // For now, map with empty vaccine counts (will be updated when vaccine records load)
      const mapped = dbPets.map((dbPet) => mapPetToView(dbPet, [], t));
      setPets(mapped);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [userId, t, petDataVersion]);

  // Observe vaccines for selected pet
  useEffect(() => {
    if (!selectedPetId) {
      setVaccines([]);
      return;
    }

    const subscription = observeVaccinesByPet(selectedPetId).subscribe(
      (records) => {
        // Filter to scheduled status only (upcoming)
        const scheduled = records.filter((r) => {
          const meta = JSON.parse(r.metadata);
          return meta.status === "scheduled";
        });
        const mapped = scheduled.map(mapVaccineToView);
        setVaccines(mapped);
      },
    );

    return () => subscription.unsubscribe();
  }, [selectedPetId]);

  // Fetch weight history for selected pet (one-shot, refetch on selection change)
  useEffect(() => {
    if (!selectedPetId) {
      setWeightHistory([]);
      return;
    }

    fetchWeightHistory(selectedPetId, 5).then((records) => {
      const mapped = records.map(mapWeightToView);
      setWeightHistory(mapped);
    });
  }, [selectedPetId]);

  // Observe medical records (visit-type records) for selected pet
  useEffect(() => {
    if (!selectedPetId) {
      setMedicalRecords([]);
      return;
    }

    const subscription = observeVisitsByPet(selectedPetId, 10).subscribe(
      (records) => {
        const mapped = records.map(mapVisitToView);
        setMedicalRecords(mapped);
      },
    );

    return () => subscription.unsubscribe();
  }, [selectedPetId]);

  // Find selected pet
  const selectedPet = pets.find((p) => p.id === selectedPetId) ?? null;

  return {
    pets,
    selectedPet,
    vaccines,
    weightHistory,
    medicalRecords,
    isLoading,
  };
}
