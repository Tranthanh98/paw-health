import { Button, Card, Pill, ThemeText } from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AIAssistantScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background px-5">
      <ThemeText variant="title">AI Assistant</ThemeText>
      <ThemeText tone="muted" className="mt-2">
        Chat with AI for guidance, image recognition and fast health analysis.
      </ThemeText>

      <Card className="mt-6">
        <Pill label="Smart Care" tone="primary" />
        <ThemeText variant="subtitle" className="mt-3">
          Ask, scan, and get instant insights
        </ThemeText>
        <ThemeText tone="muted" className="mt-2">
          Start a conversation or upload a photo to receive AI-powered support.
        </ThemeText>
        <Button title="Start AI chat" className="mt-5" />
      </Card>
    </SafeAreaView>
  );
}
