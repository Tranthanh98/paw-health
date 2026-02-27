import type { MedicalRecord, Pet, Vaccine, WeightHistoryEntry } from "./types";

export const MOCK_PETS: Pet[] = [
  {
    id: "1",
    name: "Bánh Bao",
    breed: "Golden Retriever",
    gender: "male",
    age: "3 tuổi",
    weight: "25 kg",
    vaccineCount: 8,
    vaccineTotal: 10,
    petImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzU812OrIcT2QsCTCBTp20tHIftjRMcqiteJyVcC60-hv38aGaumlYA2xHovEQsv5ArM0aCU8zVNT1J4eRez-tsxNUL0MQAXfXwK0i0K7YoMJ_AnTeadfl-cFTIS5gIS6KLgYEq6itPQXWJmt1Bpreenkkh0v0mix_jfCK4j9sCSv2-6FDJWWuRaGzw_qz7eormiSOjLPLxx4U6g1VmBi7fYAC1O2uABodcn31sSJygr7DFYvZtV2zIGIBFHKAE3wV8OxzsWd2IA1X",
  },
  {
    id: "2",
    name: "Miu Miu",
    breed: "Scottish Fold",
    gender: "female",
    age: "2 tuổi",
    weight: "4.5 kg",
    vaccineCount: 4,
    vaccineTotal: 4,
    petImage: undefined,
  },
];

export const MOCK_VACCINES: Vaccine[] = [
  { id: "1", name: "Rabies", dueDate: "Mar 15" },
  { id: "2", name: "DHPP", dueDate: "Apr 2" },
  { id: "3", name: "Bordetella", dueDate: "Jun 10" },
];

export const WEIGHT_HISTORY: Record<string, WeightHistoryEntry[]> = {
  "1": [
    { date: "Oct", value: 23.5 },
    { date: "Nov", value: 24.2 },
    { date: "Dec", value: 24.8 },
    { date: "Jan", value: 25.1 },
    { date: "Feb", value: 25.0 },
  ],
  "2": [
    { date: "Oct", value: 4.0 },
    { date: "Nov", value: 4.1 },
    { date: "Dec", value: 4.3 },
    { date: "Jan", value: 4.5 },
    { date: "Feb", value: 4.5 },
  ],
};

export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: "1",
    title: "Annual Check-up",
    date: "Feb 10, 2026",
    vet: "Dr. Nguyen",
  },
  {
    id: "2",
    title: "Dental Cleaning",
    date: "Jan 5, 2026",
    vet: "Dr. Tran",
  },
  {
    id: "3",
    title: "Skin Allergy Treatment",
    date: "Dec 20, 2025",
    vet: "Dr. Le",
  },
];
