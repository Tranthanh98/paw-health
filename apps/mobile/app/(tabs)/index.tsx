import {
  AITipCard,
  AppointmentCard,
  ArticleCard,
  PetCard,
  Pill,
  ThemeText,
} from "@/components/ui";
import type { Pet } from "@/db/models";
import { observePets } from "@/db/queries/pets";
import { useUIStore } from "@/stores/uiStore";
import { router } from "expo-router";
import { Bell, Droplet, Syringe } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CURRENT_USER_ID = "local-user";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { setSelectedPetId } = useUIStore();
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const subscription = observePets(CURRENT_USER_ID).subscribe(setPets);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className=" px-5 pt-4 pb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 rounded-full border-2 border-primary p-0.5">
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgAVvB3ltLYokjg_Ik8EyhLiegbFxQmnz-v2eV9Sq7_pE-oKFGFUocjoKRSZy5HAugcJEPM0hKk84mrAA9vGcLC29eWjSg5OHY9Muqw-QQnCbWW1zFhiJGxAchU8bZGjrsqwEqWrwhe_NbrUumC00hH14uQYWiGpukzV6gSJipaMXEBLvYvr9P3j8s8aedXiiM8K8BglkAedJ6XwPo8t2JSHcid2kxjvFwPB0RVuq_tWlJsVmPwYjaZFt_BHvPoI_3CTm7pxgGpw1P",
                  }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
              <View>
                <ThemeText className="text-sm" tone="muted">
                  {t("home.greeting")}
                </ThemeText>
                <ThemeText className="text-xl font-bold">
                  {t("home.goodMorning")}
                </ThemeText>
              </View>
            </View>
            <Pressable className="relative w-10 h-10 items-center justify-center rounded-full bg-background">
              <Bell size={24} color="#1A1A2E" />
              <View className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-error border-2 border-white" />
            </Pressable>
          </View>
        </View>

        {/* Main Content */}
        <View className="gap-6 px-5 py-5">
          {/* Pet Cards Section */}
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 12,
                paddingVertical: 8,
                paddingHorizontal: 2,
              }}
              snapToInterval={152}
              decelerationRate="fast"
            >
              <PetCard isAddCard onPress={() => router.push("/pet/new")} />
              {pets.map((pet) => (
                <PetCard
                  key={pet.id}
                  petName={pet.name}
                  petBreed={pet.breed}
                  petWeight={pet.weightKg ? `${pet.weightKg} kg` : undefined}
                  petGender={pet.gender}
                  petImage={pet.photoUri ?? undefined}
                  onPress={() => {
                    setSelectedPetId(pet.id);
                    router.push("/(tabs)/health");
                  }}
                />
              ))}
            </ScrollView>
          </View>

          {/* Appointments Section */}
          <View>
            <View className="flex-row items-center justify-between mb-3">
              <ThemeText className="text-lg font-bold">
                {t("home.todayAppointments")}
              </ThemeText>
              <Pressable>
                <ThemeText className="text-sm font-medium text-primary">
                  {t("common.seeAll")}
                </ThemeText>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 12,
                paddingVertical: 6,
                paddingHorizontal: 2,
              }}
            >
              <AppointmentCard
                title="Tiêm ngừa"
                time="10:00 AM"
                icon={<Syringe size={20} color="#2563EB" />}
                iconBgColor="#DBEAFE"
                onPress={() => console.log("View appointment")}
              />
              <AppointmentCard
                title="Tắm spa"
                time="15:00 PM"
                icon={<Droplet size={20} color="#EC4899" />}
                iconBgColor="#FCE7F3"
                onPress={() => console.log("View appointment")}
              />
              <AppointmentCard
                isAddCard
                onPress={() => console.log("Add appointment")}
              />
            </ScrollView>
          </View>

          {/* AI Tips Section */}
          <AITipCard
            tip={t("home.aiTip")}
            onPress={() => console.log("View AI tips")}
          />

          {/* Pet Knowledge Section */}
          <View>
            <ThemeText className="text-lg font-bold mb-3">
              {t("home.petKnowledge")}
            </ThemeText>

            {/* Category Pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, marginBottom: 16 }}
            >
              <Pill label={t("home.categories.all")} tone="primary" />
              <Pill label={t("home.categories.dog")} tone="muted" />
              <Pill label={t("home.categories.cat")} tone="muted" />
            </ScrollView>

            {/* Articles */}
            <View className="gap-3">
              <ArticleCard
                title="5 Dấu hiệu nhận biết cún cưng đang bị stress"
                category="Sức khỏe"
                categoryColor="#2563EB"
                categoryBgColor="#DBEAFE"
                readTime="5 phút đọc"
                onPress={() => console.log("View article")}
              />
              <ArticleCard
                title="Chế độ dinh dưỡng cho mèo con dưới 3 tháng tuổi"
                category="Dinh dưỡng"
                categoryColor="#EA580C"
                categoryBgColor="#FFEDD5"
                readTime="3 phút đọc"
                onPress={() => console.log("View article")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
