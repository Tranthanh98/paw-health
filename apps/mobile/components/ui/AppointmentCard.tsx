import { Clock, Plus } from "lucide-react-native";
import { Pressable, View, type PressableProps } from "react-native";
import { ThemeText } from "./ThemeText";

type AppointmentCardProps = PressableProps & {
  isAddCard?: boolean;
  title?: string;
  time?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  className?: string;
};

export function AppointmentCard({
  isAddCard = false,
  title,
  time,
  icon,
  iconBgColor = "#DBEAFE",
  className = "",
  ...props
}: AppointmentCardProps) {
  if (isAddCard) {
    return (
      <Pressable
        className={`w-[60px] h-[100px] rounded-3xl border-2 border-dashed border-text-secondary/30 bg-background items-center justify-center ${className}`.trim()}
        {...props}
      >
        <Plus size={24} color="#6B7280" />
      </Pressable>
    );
  }

  return (
    <Pressable
      className={`w-[160px] rounded-3xl bg-surface border border-background p-4 shadow-sm ${className}`.trim()}
      {...props}
    >
      {/* Icon */}
      <View
        className="w-10 h-10 rounded-full items-center justify-center mb-2"
        style={{ backgroundColor: iconBgColor }}
      >
        {icon}
      </View>

      {/* Title */}
      <ThemeText className="text-sm font-bold mb-1">{title}</ThemeText>

      {/* Time */}
      {time && (
        <View className="flex-row items-center gap-1">
          <Clock size={14} color="#6B7280" />
          <ThemeText className="text-xs" tone="muted">
            {time}
          </ThemeText>
        </View>
      )}
    </Pressable>
  );
}
