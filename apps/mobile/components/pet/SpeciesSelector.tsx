import { ThemeText } from "@/components/ui";
import { Cat, Dog, Sparkles } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

export type Species = "dog" | "cat" | "other";

type SpeciesSelectorProps = {
  value: Species;
  onChange: (value: Species) => void;
};

const SPECIES_OPTIONS: {
  key: Species;
  labelKey: string;
  Icon: React.ElementType;
}[] = [
  { key: "dog", labelKey: "addPet.dog", Icon: Dog },
  { key: "cat", labelKey: "addPet.cat", Icon: Cat },
  { key: "other", labelKey: "addPet.other", Icon: Sparkles },
];

export function SpeciesSelector({ value, onChange }: SpeciesSelectorProps) {
  const { t } = useTranslation();

  return (
    <View>
      <ThemeText variant="caption" className="font-semibold mb-3 ml-1">
        {t("addPet.species")}
      </ThemeText>
      <View className="flex-row gap-3">
        {SPECIES_OPTIONS.map(({ key, labelKey, Icon }) => {
          const selected = value === key;
          return (
            <Pressable
              key={key}
              onPress={() => onChange(key)}
              className={`flex-1 items-center py-3 rounded-2xl border-2 ${
                selected
                  ? "border-primary bg-primary/10"
                  : "border-primary/20 bg-surface"
              }`}
            >
              <Icon
                size={24}
                color="#FF8C69"
                strokeWidth={selected ? 2.5 : 1.5}
              />
              <ThemeText
                variant="caption"
                className={`mt-1 ${selected ? "text-primary font-semibold" : "text-text-secondary"}`}
              >
                {t(labelKey)}
              </ThemeText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
