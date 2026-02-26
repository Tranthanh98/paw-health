import { Button, Card, Pill, ThemeText } from "@/components/ui";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-background px-5 pt-8">
      <ThemeText variant="title">Profile</ThemeText>

      <Card className="mt-6">
        <Pill label="Member" tone="secondary" />
        <ThemeText variant="subtitle" className="mt-3">
          Thanh Tran
        </ThemeText>
        <ThemeText tone="muted" className="mt-2">
          Keep your pet records and preferences up to date.
        </ThemeText>
        <Button title="Edit profile" variant="surface" className="mt-5" />
      </Card>
    </View>
  );
}
