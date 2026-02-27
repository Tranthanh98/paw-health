import { Search, SlidersHorizontal } from "lucide-react-native";
import { Pressable, TextInput, View } from "react-native";
import { themeColors } from "./types";

type SearchBarProps = {
  placeholder: string;
};

export function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <View className="mt-4">
      <View className="relative">
        <View className="absolute left-4 top-3">
          <Search size={20} color={themeColors.textSecondary} />
        </View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={themeColors.textSecondary}
          className="h-12 rounded-2xl bg-surface px-11 text-sm font-medium text-text-primary"
        />
        <Pressable className="absolute right-3 top-2.5 h-7 w-7 items-center justify-center rounded-lg bg-background">
          <SlidersHorizontal size={16} color={themeColors.primary} />
        </Pressable>
      </View>
    </View>
  );
}
