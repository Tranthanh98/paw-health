import { Card, ThemeText } from "@/components/ui";
import { PawPrint, Pencil } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Image, Pressable, View } from "react-native";
import type { Pet } from "./types";

interface PetInfoCardProps {
  pet: Pet;
  onEditPress?: () => void;
}

export function PetInfoCard({ pet, onEditPress }: PetInfoCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="p-0 gap-0 rounded-[32px]">
      <View className="flex-row p-2 gap-4">
        {/* Avatar */}
        <View className="w-[88px] h-[88px] rounded-2xl overflow-hidden">
          {pet.petImage ? (
            <Image
              source={{ uri: pet.petImage }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full bg-primary/10 items-center justify-center">
              <PawPrint size={36} color="#FF8C69" />
            </View>
          )}
        </View>

        {/* Info */}
        <View className="flex-1 gap-2 py-0.5">
          {/* Name + status badge */}
          <View className="flex-row items-center gap-2">
            <ThemeText className="text-lg font-bold">{pet.name}</ThemeText>
            <View className="rounded-md bg-success/15 px-2 py-0.5">
              <ThemeText
                className="text-[10px] font-bold"
                style={{ color: "#10B981", letterSpacing: 0.4 }}
              >
                {t("health.statusHealthy").toUpperCase()}
              </ThemeText>
            </View>
          </View>

          {/* Breed • age */}
          <ThemeText className="text-sm" tone="muted">
            {pet.breed} • {pet.age}
          </ThemeText>

          {/* Divider */}
          <View className="h-px bg-background" />

          {/* Stats */}
          <View className="flex-row">
            <View className="flex-1">
              <ThemeText className="text-[10px] font-semibold" tone="muted">
                {t("health.weight").toUpperCase()}
              </ThemeText>
              <ThemeText className="text-sm font-bold mt-0.5">
                {pet.weight}
              </ThemeText>
            </View>
            <View className="flex-1">
              <ThemeText className="text-[10px] font-semibold" tone="muted">
                {t("health.gender").toUpperCase()}
              </ThemeText>
              <ThemeText className="text-sm font-bold mt-0.5">
                {pet.gender === "male"
                  ? t("health.genderMale")
                  : t("health.genderFemale")}
              </ThemeText>
            </View>
            <View className="flex-1">
              <ThemeText className="text-[10px] font-semibold" tone="muted">
                {t("health.vaccines").toUpperCase()}
              </ThemeText>
              <ThemeText className="text-sm font-bold mt-0.5" tone="primary">
                {pet.vaccineCount}/{pet.vaccineTotal}
              </ThemeText>
            </View>
          </View>
        </View>
      </View>

      {/* Edit button */}
      <Pressable
        className="mx-2 mb-1 h-12 rounded-2xl bg-background items-center justify-center flex-row gap-2"
        onPress={onEditPress}
      >
        <Pencil size={14} color="#FF8C69" />
        <ThemeText className="text-sm font-medium" tone="primary">
          {t("health.editProfile")}
        </ThemeText>
      </Pressable>
    </Card>
  );
}
