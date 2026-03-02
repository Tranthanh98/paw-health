import { ThemeText } from "@/components/ui";
import { logWeight } from "@/db/queries";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { X } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, TextInput, View } from "react-native";

type AddWeightModalProps = {
  visible: boolean;
  petId: string | null;
  onClose: () => void;
  onSuccess?: () => void;
};

export function AddWeightModal({
  visible,
  petId,
  onClose,
  onSuccess,
}: AddWeightModalProps) {
  const { t } = useTranslation();
  const snapPoints = useMemo(() => ["70%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [weight, setWeight] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  // Reset form when modal closes
  useEffect(() => {
    if (!visible) {
      setWeight("");
    }
  }, [visible]);

  const handleSave = async () => {
    if (!weight.trim()) {
      Alert.alert(t("addPet.validation.nameRequired") || "Please enter weight");
      return;
    }

    if (!petId) {
      Alert.alert("Error", "Pet not selected");
      return;
    }

    try {
      setIsLoading(true);
      const weightKg = parseFloat(weight);

      if (isNaN(weightKg) || weightKg <= 0) {
        Alert.alert("Error", "Please enter a valid weight");
        return;
      }

      // Log weight to database
      await logWeight(petId, weightKg, Date.now());

      setWeight("");
      onClose();
      onSuccess?.();
      Alert.alert("Success", "Weight recorded successfully");
    } catch (error) {
      console.error("[AddWeightModal] failed to save weight:", error);
      Alert.alert("Error", "Failed to record weight. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={(index: number) => {
        if (index === -1) {
          onClose();
        }
      }}
      backdropComponent={(props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <ThemeText className="text-lg font-bold">
            {t("health.actions.logWeight") || "Log Weight"}
          </ThemeText>
          <Pressable
            onPress={onClose}
            disabled={isLoading}
            className="w-8 h-8 items-center justify-center rounded-full bg-primary/10"
          >
            <X size={20} color="#FF8C69" strokeWidth={2} />
          </Pressable>
        </View>

        {/* Form */}
        <View className="gap-4">
          {/* Weight Input */}
          <View>
            <ThemeText variant="caption" className="font-semibold mb-2 ml-1">
              {t("addPet.weight") || "Weight (kg)"}
            </ThemeText>
            <TextInput
              className="px-4 py-3.5 rounded-2xl border border-primary/20 bg-background text-base text-text-primary"
              placeholder="0.0"
              placeholderTextColor="#9CA3AF"
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              editable={!isLoading}
              style={{ fontFamily: "SFProRounded" }}
            />
          </View>

          {/* Save Button */}
          <Pressable
            onPress={handleSave}
            disabled={isLoading || !weight.trim()}
            className={`mt-2 py-3.5 rounded-full items-center justify-center ${
              isLoading || !weight.trim() ? "bg-primary/50" : "bg-primary"
            }`}
            style={{
              shadowColor: "#FF8C69",
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <ThemeText className="text-surface font-bold text-base">
              {isLoading ? t("common.loading") || "Saving..." : "Save Weight"}
            </ThemeText>
          </Pressable>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
