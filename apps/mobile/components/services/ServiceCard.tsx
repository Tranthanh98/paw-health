import { Button, Pill, ThemeText } from "@/components/ui";
import { BadgeCheck, Heart, Star } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { type ServiceCardData, themeColors } from "./types";

type ServiceCardProps = {
  data: ServiceCardData;
};

export function ServiceCard({ data }: ServiceCardProps) {
  return (
    <View className="overflow-hidden rounded-3xl border border-background bg-surface">
      <View className="relative h-40 w-full bg-background">
        <Image
          source={{ uri: data.image }}
          className="h-full w-full"
          resizeMode="cover"
        />
        {data.badge ? (
          <View
            className={`absolute left-3 top-3 flex-row items-center gap-1 rounded-full px-3 py-1 ${
              data.badge.tone === "primary"
                ? "bg-primary"
                : data.badge.tone === "accent"
                  ? "bg-accent"
                  : "bg-surface/90"
            }`.trim()}
          >
            {data.badge.withIcon ? (
              <BadgeCheck size={12} color={themeColors.secondary} />
            ) : null}
            <ThemeText
              className={`text-xs font-bold ${
                data.badge.tone === "primary"
                  ? "text-surface"
                  : data.badge.tone === "accent"
                    ? "text-text-primary"
                    : "text-secondary"
              }`.trim()}
            >
              {data.badge.label}
            </ThemeText>
          </View>
        ) : null}
        <Pressable className="absolute right-3 top-3 h-8 w-8 items-center justify-center rounded-full bg-surface/80">
          <Heart size={18} color={themeColors.textSecondary} />
        </Pressable>
      </View>

      <View className="p-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <ThemeText className="text-base font-bold" numberOfLines={1}>
              {data.name}
            </ThemeText>
            <ThemeText className="text-sm" tone="muted">
              {data.address}
            </ThemeText>
          </View>
          <View className="items-end">
            <View className="flex-row items-center gap-1">
              <ThemeText className="text-sm font-bold text-accent">
                {data.rating}
              </ThemeText>
              <Star size={14} color={themeColors.accent} />
            </View>
            <ThemeText className="text-xs" tone="muted">
              {data.distance}
            </ThemeText>
          </View>
        </View>

        <View className="mt-3 flex-row flex-wrap" style={{ gap: 8 }}>
          {data.tags.map((tag) => (
            <Pill
              key={tag.key}
              label={tag.label}
              tone={tag.tone}
              className="px-2 py-0.5"
            />
          ))}
        </View>

        <View className="mt-4 flex-row items-center border-t border-background pt-3">
          <View className="flex-1">
            <ThemeText className="text-xs" tone="muted">
              {data.metaLabel}
            </ThemeText>
            <ThemeText
              className={`text-sm font-semibold ${
                data.metaTone === "success"
                  ? "text-success"
                  : "text-text-primary"
              }`.trim()}
            >
              {data.metaValue}
            </ThemeText>
          </View>
          <Button title={data.actionLabel} className="h-10 px-4" />
        </View>
      </View>
    </View>
  );
}
