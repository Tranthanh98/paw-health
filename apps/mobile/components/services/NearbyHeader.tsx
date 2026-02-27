import { ThemeText } from "@/components/ui";
import { MapPin } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { themeColors } from "./types";

type NearbyHeaderProps = {
  title: string;
  location: string;
};

export function NearbyHeader({ title, location }: NearbyHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <ThemeText className="text-lg font-bold">{title}</ThemeText>
        <MapPin size={16} color={themeColors.primary} />
      </View>
      <Pressable className="flex-row items-center gap-1">
        <ThemeText className="text-sm" tone="muted">
          {location}
        </ThemeText>
      </Pressable>
    </View>
  );
}
