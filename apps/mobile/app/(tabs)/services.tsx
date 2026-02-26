import { Button, Card, Pill, ThemeText } from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServicesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background px-5">
      <ThemeText variant="title">Services</ThemeText>
      <ThemeText tone="muted" className="mt-2">
        Find and book pet shops, clinics and trusted pet sitter services.
      </ThemeText>

      <Card className="mt-6">
        <Pill label="Booking" tone="accent" />
        <ThemeText variant="subtitle" className="mt-3">
          Discover nearby services
        </ThemeText>
        <ThemeText tone="muted" className="mt-2">
          Compare providers quickly and schedule appointments for your pet.
        </ThemeText>
        <Button title="Search services" className="mt-5" />
      </Card>
    </SafeAreaView>
  );
}
