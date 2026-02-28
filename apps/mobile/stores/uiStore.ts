/**
 * UI store — ephemeral state that doesn't need to be persisted.
 * Heavy/persisted data lives in WatermelonDB (db/).
 */
import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────

type SyncState = "idle" | "syncing" | "error";

interface UIState {
  // Active pet selection (shared across Health, quick-actions, etc.)
  selectedPetId: string | null;
  setSelectedPetId: (id: string | null) => void;

  // Sync status banner
  syncState: SyncState;
  syncError: string | null;
  setSyncing: () => void;
  setSyncSuccess: () => void;
  setSyncError: (message: string) => void;

  // Health tab filters
  healthFilter: "all" | "vaccines" | "records" | "weight";
  setHealthFilter: (filter: UIState["healthFilter"]) => void;

  // Services tab
  selectedServiceCategory: string | null;
  setSelectedServiceCategory: (id: string | null) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────

export const useUIStore = create<UIState>((set) => ({
  // Pet selection
  selectedPetId: null,
  setSelectedPetId: (id) => set({ selectedPetId: id }),

  // Sync
  syncState: "idle",
  syncError: null,
  setSyncing: () => set({ syncState: "syncing", syncError: null }),
  setSyncSuccess: () => set({ syncState: "idle", syncError: null }),
  setSyncError: (message) => set({ syncState: "error", syncError: message }),

  // Health filters
  healthFilter: "all",
  setHealthFilter: (filter) => set({ healthFilter: filter }),

  // Services
  selectedServiceCategory: null,
  setSelectedServiceCategory: (id) => set({ selectedServiceCategory: id }),
}));
