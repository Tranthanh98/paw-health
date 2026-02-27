import { ThemeText } from "@/components/ui";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

interface ProfileMenuItemProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  onPress?: () => void;
  showChevron?: boolean;
  danger?: boolean;
}

export function ProfileMenuItem({
  icon,
  title,
  description,
  onPress,
  showChevron = true,
  danger = false,
}: ProfileMenuItemProps) {
  const Icon = icon;

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center py-4 px-4 bg-surface rounded-3xl active:bg-background"
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${
          danger ? "bg-error/10" : "bg-primary/10"
        }`}
      >
        <Icon size={20} color={danger ? "#EF4444" : "#FF8C69"} />
      </View>

      <View className="flex-1 ml-3">
        <ThemeText className={`font-semibold ${danger ? "text-error" : ""}`}>
          {title}
        </ThemeText>
        {description && (
          <ThemeText tone="muted" className="text-xs mt-0.5">
            {description}
          </ThemeText>
        )}
      </View>

      {showChevron && (
        <View className="ml-2">
          <ThemeText tone="muted">›</ThemeText>
        </View>
      )}
    </Pressable>
  );
}
