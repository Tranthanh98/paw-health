import { ThemeText } from "@/components/ui";
import { Pressable, View } from "react-native";
import { type CategoryItem, categoryToneStyles } from "./types";

type CategoryButtonProps = {
  item: CategoryItem;
};

export function CategoryButton({ item }: CategoryButtonProps) {
  const Icon = item.icon;
  const toneStyle = categoryToneStyles[item.tone];
  return (
    <Pressable className="items-center" style={{ width: "22%" }}>
      <View
        className={`h-16 w-16 items-center justify-center rounded-2xl ${toneStyle.container}`.trim()}
      >
        <Icon size={28} color={toneStyle.icon} />
      </View>
      <ThemeText className="mt-2 text-xs font-semibold text-center">
        {item.label}
      </ThemeText>
    </Pressable>
  );
}
