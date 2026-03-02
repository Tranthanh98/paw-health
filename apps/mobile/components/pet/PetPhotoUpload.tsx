import { ThemeText } from "@/components/ui";
import * as ImagePicker from "expo-image-picker";
import { Camera, Pencil } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Alert, Image, Pressable, View } from "react-native";

type PetPhotoUploadProps = {
  value?: string;
  onChange?: (uri: string) => void;
};

export function PetPhotoUpload({ value, onChange }: PetPhotoUploadProps) {
  const { t } = useTranslation();

  const handlePress = async () => {
    try {
      console.log("[PetPhotoUpload] Requesting media library permissions...");
      // const permissionResult =
      //   await ImagePicker.requestMediaLibraryPermissionsAsync();
      // // console.log(
      // //   `[PetPhotoUpload] Permission status: ${permissionResult.status}`,
      // // );

      // if (!permissionResult.granted) {
      //   Alert.alert(
      //     t("addPet.photoPermissionTitle") || "Permission required",
      //     t("addPet.photoPermissionMessage") ||
      //       "Please allow access to your photo library.",
      //   );
      //   return;
      // }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        onChange?.(result.assets[0].uri);
      }
    } catch (error) {
      console.error("[PetPhotoUpload] Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  return (
    <View className="items-center mb-8">
      <Pressable onPress={handlePress} className="relative">
        <View className="w-28 h-28 rounded-full bg-primary/10 border-4 border-surface items-center justify-center overflow-hidden">
          {value ? (
            <Image
              source={{ uri: value }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <Camera size={40} color="#FF8C69" strokeWidth={1.5} />
          )}
        </View>
        <View className="absolute bottom-1 right-1 bg-primary rounded-full p-1.5 border-2 border-surface">
          <Pencil size={14} color="#FFFFFF" strokeWidth={2} />
        </View>
      </Pressable>
      <ThemeText variant="caption" tone="primary" className="mt-2">
        {value
          ? t("addPet.changePhoto") || t("addPet.addPhoto")
          : t("addPet.addPhoto")}
      </ThemeText>
    </View>
  );
}
