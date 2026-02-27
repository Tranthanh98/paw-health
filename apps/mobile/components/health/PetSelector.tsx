import { ThemeText } from "@/components/ui";
import { PawPrint } from "lucide-react-native";
import { Image, Pressable, ScrollView, View } from "react-native";
import type { Pet } from "./types";

interface PetSelectorProps {
  pets: Pet[];
  selectedPetId: string;
  onSelectPet: (petId: string) => void;
}

export function PetSelector({
  pets,
  selectedPetId,
  onSelectPet,
}: PetSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 16, paddingVertical: 4 }}
    >
      {pets.map((pet) => {
        const isSelected = selectedPetId === pet.id;
        return (
          <Pressable
            key={pet.id}
            className="items-center gap-2"
            onPress={() => onSelectPet(pet.id)}
          >
            <View
              className={`w-16 h-16 rounded-full overflow-hidden ${
                isSelected
                  ? "border-2 border-primary"
                  : "border-2 border-background"
              }`}
            >
              {pet.petImage ? (
                <Image
                  source={{ uri: pet.petImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View
                  className={`w-full h-full items-center justify-center ${
                    isSelected ? "bg-primary/10" : "bg-surface"
                  }`}
                >
                  <PawPrint
                    size={28}
                    color={isSelected ? "#FF8C69" : "#9CA3AF"}
                  />
                </View>
              )}
            </View>
            <ThemeText
              className="text-xs font-semibold"
              tone={isSelected ? "primary" : "muted"}
            >
              {pet.name}
            </ThemeText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
