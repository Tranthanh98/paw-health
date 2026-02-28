import {
  MedicalRecordsSection,
  MOCK_MEDICAL_RECORDS,
  MOCK_PETS,
  MOCK_VACCINES,
  PetInfoCard,
  PetSelector,
  QuickActions,
  VaccinesSection,
  WEIGHT_HISTORY,
  WeightLineChart,
} from "@/components/health";
import { AITipCard, Card, Pill, ThemeText } from "@/components/ui";
import { useUIStore } from "@/stores/uiStore";
import {
  ClipboardList,
  Plus,
  Stethoscope,
  Syringe,
  TrendingUp,
  Weight,
} from "lucide-react-native";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HealthScreen() {
  const { t } = useTranslation();
  const { selectedPetId, setSelectedPetId } = useUIStore();

  // Default to first pet on first mount
  useEffect(() => {
    if (!selectedPetId) setSelectedPetId(MOCK_PETS[0]?.id ?? null);
  }, []);
  const selectedPet =
    MOCK_PETS.find((p) => p.id === (selectedPetId ?? MOCK_PETS[0]?.id)) ??
    MOCK_PETS[0];
  const weightHistory =
    WEIGHT_HISTORY[selectedPet?.id ?? "1"] ?? WEIGHT_HISTORY["1"];

  const quickActions = [
    {
      icon: <Weight size={22} color="#FF8C69" />,
      label: t("health.actions.logWeight"),
      bg: "#FFF0EB",
    },
    {
      icon: <Syringe size={22} color="#6366F1" />,
      label: t("health.actions.vaccines"),
      bg: "#EEF2FF",
    },
    {
      icon: <Stethoscope size={22} color="#10B981" />,
      label: t("health.actions.vetVisit"),
      bg: "#D1FAE5",
    },
    {
      icon: <ClipboardList size={22} color="#F59E0B" />,
      label: t("health.actions.records"),
      bg: "#FEF3C7",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-2 flex-row items-center justify-between">
          <View>
            <ThemeText variant="title">{t("health.title")}</ThemeText>
            <ThemeText tone="muted" className="text-sm mt-0.5">
              {t("health.subtitle")}
            </ThemeText>
          </View>
          <Pressable className="w-10 h-10 items-center justify-center rounded-full bg-primary">
            <Plus size={20} color="white" />
          </Pressable>
        </View>

        <View className="gap-6 px-5 pt-4">
          {/* Pet Selector */}
          <PetSelector
            pets={MOCK_PETS}
            selectedPetId={selectedPetId ?? MOCK_PETS[0]?.id ?? ""}
            onSelectPet={setSelectedPetId}
          />

          {/* Pet Info Card */}
          <PetInfoCard
            pet={selectedPet}
            onEditPress={() => console.log("Edit profile")}
          />

          {/* Quick Actions */}
          <QuickActions
            actions={quickActions}
            onActionPress={(label) => console.log(label)}
          />

          {/* Upcoming Vaccinations */}
          <VaccinesSection
            vaccines={MOCK_VACCINES}
            onVaccinePress={(vaccineId) =>
              console.log("View vaccine", vaccineId)
            }
            onAddPress={() => console.log("Add vaccine")}
          />

          {/* Weight Line Chart */}
          <Card>
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-2">
                <View className="w-8 h-8 rounded-xl bg-success/10 items-center justify-center">
                  <TrendingUp size={16} color="#10B981" />
                </View>
                <ThemeText className="font-bold text-base">
                  {t("health.weightTrend")}
                </ThemeText>
              </View>
              <Pill label={t("health.last5Months")} tone="muted" />
            </View>
            <WeightLineChart data={weightHistory} />
          </Card>

          {/* Medical Records */}
          <MedicalRecordsSection
            records={MOCK_MEDICAL_RECORDS}
            onRecordPress={(recordId) => console.log("View record", recordId)}
          />

          {/* AI Health Tip */}
          <AITipCard
            tip={t("health.aiTip")}
            onPress={() => console.log("View AI health tips")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
