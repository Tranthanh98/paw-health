/**
 * Pet repository — all DB operations for the Pet entity.
 */
import { Q } from "@nozbe/watermelondb";
import { database, petsCollection } from "../index";
import type { Pet, PetGender, PetSpecies } from "../models";

// ─── Read ─────────────────────────────────────────────────────────────────

/** Observe all pets for the current user — reactive (re-renders on change). */
export function observePets(userId: string) {
  return petsCollection.query(Q.where("user_id", userId)).observe();
}

/** Fetch all pets once (non-reactive). */
export async function fetchPets(userId: string): Promise<Pet[]> {
  return petsCollection.query(Q.where("user_id", userId)).fetch();
}

/** Fetch a single pet by local ID. */
export async function fetchPet(id: string): Promise<Pet> {
  return petsCollection.find(id);
}

// ─── Write ────────────────────────────────────────────────────────────────

export interface CreatePetInput {
  userId: string;
  name: string;
  species: PetSpecies;
  breed: string;
  gender: PetGender;
  birthday?: number;
  weightKg: number;
  photoUri?: string;
}

export async function createPet(input: CreatePetInput): Promise<Pet> {
  return database.write(async () =>
    petsCollection.create((pet) => {
      pet.userId = input.userId;
      pet.name = input.name;
      pet.species = input.species;
      pet.breed = input.breed;
      pet.gender = input.gender;
      pet.birthday = input.birthday ?? null;
      pet.weightKg = input.weightKg;
      pet.photoUri = input.photoUri ?? null;
    }),
  );
}

export interface UpdatePetInput extends Partial<
  Omit<CreatePetInput, "userId">
> {}

export async function updatePet(pet: Pet, input: UpdatePetInput): Promise<Pet> {
  return database.write(async () =>
    pet.update((p) => {
      if (input.name !== undefined) p.name = input.name!;
      if (input.species !== undefined) p.species = input.species!;
      if (input.breed !== undefined) p.breed = input.breed!;
      if (input.gender !== undefined) p.gender = input.gender!;
      if (input.birthday !== undefined) p.birthday = input.birthday!;
      if (input.weightKg !== undefined) p.weightKg = input.weightKg!;
      if (input.photoUri !== undefined) p.photoUri = input.photoUri!;
    }),
  );
}

export async function deletePet(pet: Pet): Promise<void> {
  await database.write(async () => pet.markAsDeleted());
}
