import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, text } from "@nozbe/watermelondb/decorators";

export type PetSpecies = "dog" | "cat" | "other";
export type PetGender = "male" | "female";

export class Pet extends Model {
  static table = "pets";

  @text("server_id") serverId!: string | null;
  @text("user_id") userId!: string;
  @text("name") name!: string;
  @text("species") species!: PetSpecies;
  @text("breed") breed!: string;
  @text("gender") gender!: PetGender;
  @field("birthday") birthday!: number | null; // Unix ms
  @field("weight_kg") weightKg!: number;
  @text("photo_uri") photoUri!: string | null;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
