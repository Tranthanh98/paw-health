import { Button, Card, Pill, ThemeText } from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background px-5">
      <ThemeText variant="title" tone="primary">
        Home
      </ThemeText>
      <ThemeText tone="muted" className="mt-2">
        Pet overview, important reminders and quick AI tips at a glance.
      </ThemeText>

      <Card className="mt-6">
        <Pill label="Today" tone="accent" />
        <ThemeText variant="subtitle" className="mt-3">
          Daily pet snapshot
        </ThemeText>
        <ThemeText tone="muted" className="mt-2">
          Track key activities and stay on top of upcoming care reminders.
        </ThemeText>
        <Button title="View reminders" className="mt-5" />
      </Card>
    </SafeAreaView>
  );
}
