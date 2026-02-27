import { ThemeText } from "@/components/ui";
import { Pressable, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  actionLabel: string;
};

export function SectionHeader({ title, actionLabel }: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-5">
      <ThemeText className="text-lg font-bold">{title}</ThemeText>
      <Pressable>
        <ThemeText className="text-sm font-semibold text-primary">
          {actionLabel}
        </ThemeText>
      </Pressable>
    </View>
  );
}
