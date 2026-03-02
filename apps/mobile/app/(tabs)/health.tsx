import {
  MedicalRecordsSection,
  PetInfoCard,
  PetSelector,
  QuickActions,
  VaccinesSection,
  WeightLineChart,
  useHealthScreenData,
} from "@/components/health";
import { AddWeightModal } from "@/components/pet";
import { AITipCard, Card, Pill, ThemeText } from "@/components/ui";
import { useUIStore } from "@/stores/uiStore";
import { router, useFocusEffect } from "expo-router";
import {
  ClipboardList,
  Plus,
  Stethoscope,
  Syringe,
  TrendingUp,
  Weight,
} from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HealthScreen() {
  const { t } = useTranslation();
  const { selectedPetId, setSelectedPetId } = useUIStore();
  const [showAddWeightModal, setShowAddWeightModal] = useState(false);

  // TODO: Get actual userId from auth context
  const userId = "local-user";

  // Load data from WatermelonDB
  const {
    pets,
    selectedPet,
    vaccines,
    weightHistory,
    medicalRecords,
    isLoading,
  } = useHealthScreenData(userId, selectedPetId);

  // Auto-refresh data when screen is focused (e.g., after returning from edit screen)
  useFocusEffect(
    useCallback(() => {
      // Data will automatically refresh via petDataVersion trigger in useHealthScreenData
      console.log("[Health] Screen focused, data will refresh");
    }, []),
  );

  // Default to first pet on first mount
  useEffect(() => {
    if (!selectedPetId && pets.length > 0) {
      setSelectedPetId(pets[0].id);
    }
  }, [pets, selectedPetId, setSelectedPetId]);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "logWeight":
        setShowAddWeightModal(true);
        break;
      case "vaccines":
        console.log("Open vaccines screen");
        break;
      case "vetVisit":
        console.log("Open vet visit form");
        break;
      case "records":
        console.log("Open all records");
        break;
      default:
        break;
    }
  };

  const quickActions = [
    {
      action: "logWeight",
      icon: <Weight size={22} color="#FF8C69" />,
      label: t("health.actions.logWeight"),
      bg: "#FFF0EB",
    },
    {
      action: "vaccines",
      icon: <Syringe size={22} color="#6366F1" />,
      label: t("health.actions.vaccines"),
      bg: "#EEF2FF",
    },
    {
      action: "vetVisit",
      icon: <Stethoscope size={22} color="#10B981" />,
      label: t("health.actions.vetVisit"),
      bg: "#D1FAE5",
    },
    {
      action: "records",
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
          {pets.length > 0 && (
            <PetSelector
              pets={pets}
              selectedPetId={selectedPetId ?? pets[0]?.id ?? ""}
              onSelectPet={setSelectedPetId}
            />
          )}

          {/* Empty state - no pets */}
          {pets.length === 0 && !isLoading && (
            <Card>
              <ThemeText className="text-center" tone="muted">
                {t("health.noPets")}
              </ThemeText>
            </Card>
          )}

          {/* Pet Info Card */}
          {selectedPet && (
            <PetInfoCard
              pet={selectedPet}
              onEditPress={() =>
                router.push(`/pet/edit?petId=${selectedPetId}`)
              }
            />
          )}

          {/* Quick Actions */}
          {selectedPet && (
            <QuickActions
              actions={quickActions}
              onActionPress={(action) => handleQuickAction(action)}
            />
          )}

          {/* Upcoming Vaccinations */}
          {selectedPet && (
            <VaccinesSection
              vaccines={vaccines}
              onVaccinePress={(vaccineId) =>
                console.log("View vaccine", vaccineId)
              }
              onAddPress={() => console.log("Add vaccine")}
            />
          )}

          {/* Weight Line Chart */}
          {selectedPet && weightHistory.length > 0 && (
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
          )}

          {/* Medical Records */}
          {selectedPet && (
            <MedicalRecordsSection
              records={medicalRecords}
              onRecordPress={(recordId) => console.log("View record", recordId)}
            />
          )}

          {/* AI Health Tip */}
          {selectedPet && (
            <AITipCard
              tip={t("health.aiTip")}
              onPress={() => console.log("View AI health tips")}
            />
          )}
        </View>
      </ScrollView>

      {/* Add Weight Modal */}
      {showAddWeightModal && (
        <AddWeightModal
          visible={showAddWeightModal}
          petId={selectedPetId}
          onClose={() => setShowAddWeightModal(false)}
          onSuccess={() => {
            console.log(
              "[Health] Weight added successfully, data will refresh",
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
