import { LinearGradient } from "expo-linear-gradient";
import { Lightbulb } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View, type PressableProps } from "react-native";
import { ThemeText } from "./ThemeText";

type AITipCardProps = PressableProps & {
  tip: string;
  className?: string;
};

export function AITipCard({ tip, className = "", ...props }: AITipCardProps) {
  const { t } = useTranslation();
  return (
    <Pressable
      className={`rounded-3xl overflow-hidden ${className}`.trim()}
      {...props}
    >
      <LinearGradient
        colors={["#FFF9C4", "#FFFDE7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="rounded-xl p-2 border border-accent/20 shadow-md overflow-hidden">
          <View className="flex-row gap-4 relative z-10 justify-center items-center">
            {/* Icon */}
            <View className="w-12 h-12 rounded-full bg-accent items-center justify-center">
              <Lightbulb size={28} color="white" />
            </View>

            {/* Content */}
            <View className="flex-1 pr-2">
              <ThemeText className="font-bold text-amber-900 mb-2 text-base">
                {t("aiTipCard.title")}
              </ThemeText>
              <ThemeText className="text-sm text-amber-800 leading-snug">
                {tip}
              </ThemeText>
            </View>
          </View>
        </View>
        {/* Background decorative icon */}
      </LinearGradient>
    </Pressable>
  );
}
