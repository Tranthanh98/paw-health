import { ThemeText } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

export type Gender = "male" | "female";

type GenderToggleProps = {
  value: Gender;
  onChange: (value: Gender) => void;
};

export function GenderToggle({ value, onChange }: GenderToggleProps) {
  const { t } = useTranslation();

  return (
    <View>
      <ThemeText variant="caption" className="font-semibold mb-2 ml-1">
        {t("addPet.gender")}
      </ThemeText>
      <View className="flex-row bg-primary/10 p-1 rounded-2xl">
        {(["male", "female"] as Gender[]).map((g) => (
          <Pressable
            key={g}
            onPress={() => onChange(g)}
            className={`flex-1 items-center py-2.5 rounded-xl ${
              value === g ? "bg-primary" : ""
            }`}
          >
            <ThemeText
              variant="caption"
              className={`font-semibold ${
                value === g ? "text-surface" : "text-text-primary"
              }`}
            >
              {t(g === "male" ? "addPet.male" : "addPet.female")}
            </ThemeText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
