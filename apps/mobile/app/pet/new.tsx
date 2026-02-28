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
import { router } from "expo-router";
import { ArrowLeft, Save } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NewPetScreen() {
  const { t } = useTranslation();

  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState<Species>("dog");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [weight, setWeight] = useState("");
  const [birthday, setBirthday] = useState("");

  const inset = useSafeAreaInsets();

  const handleSave = () => {
    // TODO: persist pet data
    router.back();
  };

  return (
    <View style={{ paddingTop: inset.top }} className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-primary/10 bg-background">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 items-center justify-center rounded-full bg-primary/10"
        >
          <ArrowLeft size={20} color="#FF8C69" strokeWidth={2} />
        </Pressable>
        <ThemeText className="flex-1 text-center text-lg font-bold mr-9">
          {t("addPet.title")}
        </ThemeText>
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
          <PetPhotoUpload />

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
              className="mt-6 bg-primary flex-row items-center justify-center gap-2 py-4 rounded-full shadow-md"
              style={{
                shadowColor: "#FF8C69",
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Save size={20} color="#FFFFFF" strokeWidth={2} />
              <ThemeText className="text-surface font-bold text-base">
                {t("addPet.saveProfile")}
              </ThemeText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
