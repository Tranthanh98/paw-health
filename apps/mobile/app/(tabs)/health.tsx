import { Button, Card, Pill, ThemeText } from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HealthScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background px-5">
      <ThemeText variant="title">Health</ThemeText>
      <ThemeText tone="muted" className="mt-2">
        Medical records, vaccination schedule, weight tracking and key health
        metrics.
      </ThemeText>

      <Card className="mt-6">
        <Pill label="Health Hub" tone="secondary" />
        <ThemeText variant="subtitle" className="mt-3">
          Track your pet wellness daily
        </ThemeText>
        <ThemeText tone="muted" className="mt-2">
          Review history, upcoming vaccines and recent indicators in one place.
        </ThemeText>
        <Button title="Open health profile" className="mt-5" />
      </Card>
    </SafeAreaView>
  );
}
