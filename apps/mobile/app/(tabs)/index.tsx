import { Button, Card, Pill, ThemeText } from "@/components/ui";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background px-5 pt-8">
      <ThemeText variant="title" tone="primary">
        Paw Health
      </ThemeText>
      <ThemeText tone="muted" className="mt-2">
        Your all-in-one pet care companion
      </ThemeText>

      <Card className="mt-6">
        <Pill label="AI Assistant" tone="accent" />
        <ThemeText variant="subtitle" className="mt-3">
          Daily health summary
        </ThemeText>
        <ThemeText tone="muted" className="mt-2">
          Follow your pet schedule and get friendly reminders.
        </ThemeText>
        <Button title="Open Care Plan" className="mt-5" />
      </Card>
    </View>
  );
}
