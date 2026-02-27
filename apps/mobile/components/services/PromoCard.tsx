import { Button, ThemeText } from "@/components/ui";
import { View } from "react-native";

type PromoCardProps = {
  eyebrow: string;
  title: string;
  actionLabel: string;
};

export function PromoCard({ eyebrow, title, actionLabel }: PromoCardProps) {
  return (
    <View className="overflow-hidden rounded-3xl bg-primary p-5">
      <View className="absolute right-0 top-0 h-20 w-20 rounded-full bg-accent/30" />
      <View className="absolute right-4 bottom-2 h-16 w-16 rounded-full bg-surface/10" />
      <ThemeText className="text-xs font-bold uppercase text-surface/90">
        {eyebrow}
      </ThemeText>
      <ThemeText className="mt-2 text-xl font-bold text-surface leading-6">
        {title}
      </ThemeText>
      <Button
        title={actionLabel}
        variant="surface"
        className="mt-4 h-10 self-start"
        textClassName="text-primary text-xs font-bold"
      />
    </View>
  );
}
