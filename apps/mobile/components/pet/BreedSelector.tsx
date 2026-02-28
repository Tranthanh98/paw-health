import { ThemeText } from "@/components/ui";
import { ChevronDown, X } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, ScrollView, View } from "react-native";

const DOG_BREEDS = [
  "Poodle",
  "Corgi",
  "Golden Retriever",
  "Husky",
  "Pomeranian",
  "Shih Tzu",
];
const CAT_BREEDS = [
  "Persian",
  "Scottish Fold",
  "Siamese",
  "British Shorthair",
  "Maine Coon",
];
const OTHER_BREEDS = ["Rabbit", "Hamster", "Bird", "Fish", "Turtle"];

type BreedSelectorProps = {
  value: string;
  species: string;
  onChange: (value: string) => void;
};

export function BreedSelector({
  value,
  species,
  onChange,
}: BreedSelectorProps) {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const breeds =
    species === "cat"
      ? CAT_BREEDS
      : species === "other"
        ? OTHER_BREEDS
        : DOG_BREEDS;

  const handleSelect = (breed: string) => {
    onChange(breed);
    setModalVisible(false);
  };

  return (
    <View>
      <ThemeText variant="caption" className="font-semibold mb-2 ml-1">
        {t("addPet.breed")}
      </ThemeText>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="flex-row items-center justify-between px-4 py-3.5 rounded-2xl border border-primary/20 bg-surface"
      >
        <ThemeText
          className={value ? "text-text-primary" : "text-text-secondary"}
        >
          {value || t("addPet.breedSelectPlaceholder")}
        </ThemeText>
        <ChevronDown size={20} color="#FF8C69" strokeWidth={2} />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            className="bg-surface rounded-t-3xl pt-4 pb-8"
            onPress={(e) => e.stopPropagation()}
          >
            <View className="flex-row items-center justify-between px-5 mb-4">
              <ThemeText className="text-lg font-bold">
                {t("addPet.breed")}
              </ThemeText>
              <Pressable onPress={() => setModalVisible(false)}>
                <X size={22} color="#6B7280" strokeWidth={2} />
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {breeds.map((breed) => (
                <Pressable
                  key={breed}
                  onPress={() => handleSelect(breed)}
                  className={`px-5 py-3.5 border-b border-background ${
                    value === breed ? "bg-primary/5" : ""
                  }`}
                >
                  <ThemeText
                    className={
                      value === breed
                        ? "text-primary font-semibold"
                        : "text-text-primary"
                    }
                  >
                    {breed}
                  </ThemeText>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
