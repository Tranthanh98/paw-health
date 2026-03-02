import type { Gender, Species } from "@/components/pet";
import {
  BirthdayInput,
  BreedSelector,
  GenderToggle,
  PetPhotoUpload,
  SpeciesSelector,
  WeightInput,
} from "@/components/pet";
import { ThemeText } from "@/components/ui";
import { deletePet, fetchPet, updatePet } from "@/db/queries/pets";
import { useUIStore } from "@/stores/uiStore";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Save, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function formatBirthday(timestamp: number | null | undefined): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function parseBirthday(value: string): number | undefined {
  if (!value) return undefined;
  const [day, month, year] = value.split("/").map(Number);
  if (!day || !month || !year) return undefined;
  return new Date(year, month - 1, day).getTime();
}

export default function EditPetScreen() {
  const { t } = useTranslation();
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const triggerPetDataRefresh = useUIStore(
    (state) => state.triggerPetDataRefresh,
  );

  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState<Species>("dog");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [weight, setWeight] = useState("");
  const [birthday, setBirthday] = useState("");
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const inset = useSafeAreaInsets();

  // Load pet data on mount
  useEffect(() => {
    if (!petId) {
      Alert.alert("Error", "Pet ID not found");
      router.back();
      return;
    }

    const loadPet = async () => {
      try {
        const pet = await fetchPet(petId);
        setPetName(pet.name);
        setSpecies(pet.species);
        setBreed(pet.breed);
        setGender(pet.gender);
        setWeight(String(pet.weightKg || ""));
        setBirthday(formatBirthday(pet.birthday));
        setPhotoUri(pet.photoUri ?? undefined);
        setIsLoading(false);
      } catch (err) {
        console.error("[EditPet] failed to load:", err);
        Alert.alert("Error", "Could not load pet data");
        router.back();
      }
    };

    loadPet();
  }, [petId]);

  const handleSave = async () => {
    if (!petName.trim()) {
      Alert.alert(
        t("addPet.validation.nameRequired") || "Please enter a pet name",
      );
      return;
    }

    try {
      const pet = await fetchPet(petId!);
      await updatePet(pet, {
        name: petName.trim(),
        species,
        breed,
        gender,
        birthday: parseBirthday(birthday),
        weightKg: parseFloat(weight) || 0,
        photoUri,
      });
      // Trigger refresh in health screen before navigating back
      triggerPetDataRefresh();
      router.back();
    } catch (err) {
      console.error("[EditPet] failed to save:", err);
      Alert.alert("Error", "Could not save changes. Please try again.");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      t("editPet.deleteConfirm") || "Delete Pet",
      t("editPet.deleteMessage") ||
        "Are you sure you want to delete this pet? This action cannot be undone.",
      [
        { text: t("common.cancel") || "Cancel", style: "cancel" },
        {
          text: t("common.delete") || "Delete",
          onPress: async () => {
            try {
              const pet = await fetchPet(petId!);
              await deletePet(pet);
              // Trigger refresh in health screen before navigating back
              triggerPetDataRefresh();
              router.back();
            } catch (err) {
              console.error("[EditPet] failed to delete:", err);
              Alert.alert("Error", "Could not delete pet");
            }
          },
          style: "destructive",
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ThemeText tone="muted">{t("common.loading")}</ThemeText>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: inset.top }} className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-primary/10 bg-background">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 items-center justify-center rounded-full bg-primary/10"
        >
          <ArrowLeft size={20} color="#FF8C69" strokeWidth={2} />
        </Pressable>
        <ThemeText className="flex-1 text-center text-lg font-bold">
          {t("editPet.title") || "Edit Pet"}
        </ThemeText>
        <Pressable
          onPress={handleDelete}
          className="w-9 h-9 items-center justify-center rounded-full bg-error/10"
        >
          <Trash2 size={20} color="#EF4444" strokeWidth={2} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 28,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Photo Upload */}
          <PetPhotoUpload value={photoUri} onChange={setPhotoUri} />

          {/* Form */}
          <View className="gap-5">
            {/* Pet Name */}
            <View>
              <ThemeText variant="caption" className="font-semibold mb-2 ml-1">
                {t("addPet.petName")}
              </ThemeText>
              <TextInput
                className="px-4 py-3.5 rounded-2xl border border-primary/20 bg-surface text-base text-text-primary"
                placeholder={t("addPet.petNamePlaceholder")}
                placeholderTextColor="#6B7280"
                value={petName}
                onChangeText={setPetName}
                style={{ fontFamily: "SFProRounded" }}
              />
            </View>

            {/* Species */}
            <SpeciesSelector value={species} onChange={setSpecies} />

            {/* Breed */}
            <BreedSelector
              value={breed}
              species={species}
              onChange={setBreed}
            />

            {/* Gender & Weight in a row */}
            <View className="flex-row gap-4">
              <View className="flex-1">
                <GenderToggle value={gender} onChange={setGender} />
              </View>
              <View className="flex-1">
                <WeightInput value={weight} onChange={setWeight} />
              </View>
            </View>

            {/* Birthday */}
            <BirthdayInput value={birthday} onChange={setBirthday} />

            {/* Save Button */}
            <Pressable
              onPress={handleSave}
              className="mt-6 bg-primary flex-row items-center justify-center gap-2 py-4 rounded-full"
              style={{
                shadowColor: "#FF8C69",
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Save size={20} color="#FFFFFF" strokeWidth={2} />
              <ThemeText className="text-surface font-bold text-base">
                {t("editPet.saveChanges") || "Save Changes"}
              </ThemeText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
