import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-primary">Paw Health</Text>
      <Text className="text-gray-600 mt-2">Your pet care companion</Text>
    </View>
  );
}
