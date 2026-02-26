import { Mars, PawPrint, Plus, Venus } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Image, Pressable, View, type PressableProps } from "react-native";
import { ThemeText } from "./ThemeText";

type PetCardProps = PressableProps & {
  isAddCard?: boolean;
  petName?: string;
  petBreed?: string;
  petAge?: string;
  petWeight?: string;
  petGender?: "male" | "female";
  vaccination?: string;
  petImage?: string;
  className?: string;
};

export function PetCard({
  isAddCard = false,
  petName,
  petBreed,
  petAge,
  petWeight,
  petGender,
  vaccination,
  petImage,
  className = "",
  ...props
}: PetCardProps) {
  const { t } = useTranslation();
  if (isAddCard) {
    return (
      <Pressable
        className={`w-[140px] h-[190px] rounded-3xl border-2 border-dashed border-text-secondary/30 bg-background items-center justify-center ${className}`.trim()}
        {...props}
      >
        <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-2">
          <Plus size={32} color="#FF8C69" />
        </View>
        <ThemeText className="text-xs font-medium" tone="muted">
          {t("common.addPet")}
        </ThemeText>
      </Pressable>
    );
  }

  return (
    <Pressable
      className={`w-[140px] rounded-3xl bg-primary p-4 shadow-md ${className}`.trim()}
      {...props}
    >
      <View className="items-center">
        {/* Pet Avatar */}
        <View className="w-16 h-16 rounded-full border-2 border-white/40 overflow-hidden mb-2">
          {petImage ? (
            <Image
              source={{ uri: petImage }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full bg-white/20 items-center justify-center">
              <PawPrint size={28} color="white" />
            </View>
          )}
        </View>

        {/* Pet Name & Gender */}
        <View className="flex-row items-center gap-1 mb-0.5">
          <ThemeText className="text-white text-base font-bold">
            {petName}
          </ThemeText>
          {petGender &&
            (petGender === "male" ? (
              <Mars size={14} color="white" />
            ) : (
              <Venus size={14} color="white" />
            ))}
        </View>

        {/* Pet Breed */}
        {petBreed && (
          <ThemeText className="text-white/80 text-xs mb-3">
            {petBreed}
          </ThemeText>
        )}

        {/* Pet Info Grid */}
        <View className="w-full gap-1">
          {petWeight && (
            <View className="rounded-xl bg-white/20 px-2 py-1">
              <ThemeText className="text-white/70 text-[10px] text-center">
                {t("petCard.weight")}
              </ThemeText>
              <ThemeText className="text-white text-xs font-bold text-center">
                {petWeight}
              </ThemeText>
            </View>
          )}
          {/* {vaccination && (
            <View className="rounded-xl bg-white/20 px-2 py-1.5">
              <ThemeText className="text-white/70 text-[10px] text-center">
                Tiêm chủng
              </ThemeText>
              <ThemeText className="text-white text-xs font-bold text-center">
                {vaccination}
              </ThemeText>
            </View>
          )} */}
        </View>
      </View>
    </Pressable>
  );
}
