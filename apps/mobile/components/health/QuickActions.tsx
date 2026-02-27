import { ThemeText } from "@/components/ui";
import { Pressable, View } from "react-native";
import type { QuickAction } from "./types";

interface QuickActionsProps {
  actions: QuickAction[];
  onActionPress?: (label: string) => void;
}

export function QuickActions({ actions, onActionPress }: QuickActionsProps) {
  return (
    <View className="flex-row gap-3">
      {actions.map((action) => (
        <Pressable
          key={action.label}
          className="flex-1 items-center gap-2"
          onPress={() => onActionPress?.(action.label)}
        >
          <View
            className="w-12 h-12 rounded-2xl items-center justify-center"
            style={{ backgroundColor: action.bg }}
          >
            {action.icon}
          </View>
          <ThemeText
            className="text-[10px] text-center font-medium"
            tone="muted"
          >
            {action.label}
          </ThemeText>
        </Pressable>
      ))}
    </View>
  );
}
