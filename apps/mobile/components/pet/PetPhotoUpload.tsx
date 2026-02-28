import { ThemeText } from "@/components/ui";
import { Camera, Pencil } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

type PetPhotoUploadProps = {
  onPress?: () => void;
};

export function PetPhotoUpload({ onPress }: PetPhotoUploadProps) {
  const { t } = useTranslation();

  return (
    <View className="items-center mb-8">
      <Pressable onPress={onPress} className="relative">
        <View className="w-28 h-28 rounded-full bg-primary/10 border-4 border-surface items-center justify-center shadow-md">
          <Camera size={40} color="#FF8C69" strokeWidth={1.5} />
        </View>
        <View className="absolute bottom-1 right-1 bg-primary rounded-full p-1.5 border-2 border-surface shadow-sm">
          <Pencil size={14} color="#FFFFFF" strokeWidth={2} />
        </View>
      </Pressable>
      <ThemeText variant="caption" tone="primary" className="mt-2">
        {t("addPet.addPhoto")}
      </ThemeText>
    </View>
  );
}
