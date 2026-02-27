export type PetGender = "male" | "female";

export interface Pet {
  id: string;
  name: string;
  breed: string;
  gender: PetGender;
  age: string;
  weight: string;
  vaccineCount: number;
  vaccineTotal: number;
  petImage?: string;
}

export interface Vaccine {
  id: string;
  name: string;
  dueDate: string;
}

export interface WeightHistoryEntry {
  date: string;
  value: number;
}

export interface MedicalRecord {
  id: string;
  title: string;
  date: string;
  vet: string;
}

export interface QuickAction {
  icon: React.ReactNode;
  label: string;
  bg: string;
}
