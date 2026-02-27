import { AppointmentCard, ThemeText } from "@/components/ui";
import { Syringe } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";
import type { Vaccine } from "./types";

interface VaccinesSectionProps {
  vaccines: Vaccine[];
  onVaccinePress?: (vaccineId: string) => void;
  onAddPress?: () => void;
}

export function VaccinesSection({
  vaccines,
  onVaccinePress,
  onAddPress,
}: VaccinesSectionProps) {
  const { t } = useTranslation();

  return (
    <View>
      <View className="flex-row items-center justify-between mb-3">
        <ThemeText className="text-lg font-bold">
          {t("health.upcomingVaccines")}
        </ThemeText>
        <Pressable>
          <ThemeText className="text-sm font-medium" tone="primary">
            {t("common.seeAll")}
          </ThemeText>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
          paddingVertical: 6,
          paddingHorizontal: 2,
        }}
      >
        {vaccines.map((v) => (
          <AppointmentCard
            key={v.id}
            title={v.name}
            time={v.dueDate}
            icon={<Syringe size={20} color="#6366F1" />}
            iconBgColor="#EEF2FF"
            onPress={() => onVaccinePress?.(v.id)}
          />
        ))}
        <AppointmentCard isAddCard onPress={onAddPress} />
      </ScrollView>
    </View>
  );
}
