import { ThemeText } from "@/components/ui";
import { CalendarDays, X } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, ScrollView, View } from "react-native";

type BirthdayInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const DAYS = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 25 }, (_, i) => String(currentYear - i));

export function BirthdayInput({ value, onChange }: BirthdayInputProps) {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState(String(currentYear - 1));

  const handleConfirm = () => {
    onChange(`${day}/${month}/${year}`);
    setModalVisible(false);
  };

  return (
    <View>
      <ThemeText variant="caption" className="font-semibold mb-2 ml-1">
        {t("addPet.birthday")}
      </ThemeText>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="flex-row items-center justify-between px-4 py-3.5 rounded-2xl border border-primary/20 bg-surface"
      >
        <ThemeText
          className={value ? "text-text-primary" : "text-text-secondary"}
        >
          {value || t("addPet.birthdayPlaceholder")}
        </ThemeText>
        <CalendarDays size={20} color="#FF8C69" strokeWidth={1.5} />
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
                {t("addPet.birthday")}
              </ThemeText>
              <Pressable onPress={() => setModalVisible(false)}>
                <X size={22} color="#6B7280" strokeWidth={2} />
              </Pressable>
            </View>

            <View className="flex-row justify-center gap-3 px-4 mb-6">
              {/* Day */}
              <PickerColumn
                label="DD"
                items={DAYS}
                selected={day}
                onSelect={setDay}
              />
              <PickerColumn
                label="MM"
                items={MONTHS}
                selected={month}
                onSelect={setMonth}
              />
              <PickerColumn
                label="YYYY"
                items={YEARS}
                selected={year}
                onSelect={setYear}
              />
            </View>

            <Pressable
              onPress={handleConfirm}
              className="mx-5 bg-primary items-center py-4 rounded-full shadow-sm"
            >
              <ThemeText className="text-surface font-bold text-base">
                OK
              </ThemeText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function PickerColumn({
  label,
  items,
  selected,
  onSelect,
}: {
  label: string;
  items: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <View className="flex-1 items-center">
      <ThemeText variant="caption" tone="muted" className="mb-2 font-semibold">
        {label}
      </ThemeText>
      <ScrollView className="h-40 w-full" showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <Pressable
            key={item}
            onPress={() => onSelect(item)}
            className={`items-center py-2 rounded-lg ${
              selected === item ? "bg-primary/10" : ""
            }`}
          >
            <ThemeText
              variant="caption"
              className={
                selected === item
                  ? "text-primary font-bold"
                  : "text-text-secondary"
              }
            >
              {item}
            </ThemeText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
