import { ThemeText } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";

type WeightInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function WeightInput({ value, onChange }: WeightInputProps) {
  const { t } = useTranslation();

  return (
    <View>
      <ThemeText variant="caption" className="font-semibold mb-2 ml-1">
        {t("addPet.weight")} ({t("addPet.weightUnit")})
      </ThemeText>
      <View className="flex-row items-center px-4 py-3.5 rounded-2xl border border-primary/20 bg-surface">
        <TextInput
          className="flex-1 text-base text-text-primary"
          placeholder={t("addPet.weightPlaceholder")}
          placeholderTextColor="#6B7280"
          keyboardType="decimal-pad"
          value={value}
          onChangeText={onChange}
          style={{ fontFamily: "SFProRounded" }}
        />
        <ThemeText variant="caption" tone="muted" className="font-medium">
          {t("addPet.weightUnit")}
        </ThemeText>
      </View>
    </View>
  );
}
