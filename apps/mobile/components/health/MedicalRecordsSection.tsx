import { ThemeText } from "@/components/ui";
import { ChevronRight, Stethoscope } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import type { MedicalRecord } from "./types";

interface MedicalRecordsSectionProps {
  records: MedicalRecord[];
  onRecordPress?: (recordId: string) => void;
}

export function MedicalRecordsSection({
  records,
  onRecordPress,
}: MedicalRecordsSectionProps) {
  const { t } = useTranslation();

  return (
    <View>
      <View className="flex-row items-center justify-between mb-3">
        <ThemeText className="text-lg font-bold">
          {t("health.medicalRecords")}
        </ThemeText>
        <Pressable>
          <ThemeText className="text-sm font-medium" tone="primary">
            {t("common.seeAll")}
          </ThemeText>
        </Pressable>
      </View>
      <View className="gap-3">
        {records.map((record) => (
          <Pressable
            key={record.id}
            className="rounded-2xl bg-surface border border-background p-4 flex-row items-center gap-4"
            onPress={() => onRecordPress?.(record.id)}
          >
            <View className="w-10 h-10 rounded-full bg-secondary/10 items-center justify-center">
              <Stethoscope size={18} color="#4A90D9" />
            </View>
            <View className="flex-1">
              <ThemeText className="text-sm font-bold">
                {record.title}
              </ThemeText>
              <ThemeText className="text-xs" tone="muted">
                {record.date} · {record.vet}
              </ThemeText>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
