import { ProfileMenuItem } from "@/components/profile";
import { Button, Card, ThemeText } from "@/components/ui";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bell,
  Bookmark,
  Calendar,
  Crown,
  Edit3,
  FileText,
  HelpCircle,
  Info,
  Languages,
  LogOut,
  MessageCircle,
  PawPrint,
  ShieldCheck,
  User,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    Alert.alert(t("profile.menu.logout"), t("profile.menu.logoutDesc"), [
      { text: "Cancel", style: "cancel" },
      {
        text: t("profile.menu.logout"),
        style: "destructive",
        onPress: () => {
          // TODO: Implement logout logic
          console.log("Logout");
        },
      },
    ]);
  };

  const getCurrentLanguage = () => {
    return i18n.language === "vi" ? "Tiếng Việt" : "English";
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="mb-6">
          <ThemeText variant="title">{t("profile.title")}</ThemeText>
          <ThemeText tone="muted" className="mt-2">
            {t("profile.subtitle")}
          </ThemeText>
        </View>

        {/* User Profile Card */}
        <Card className="mb-5">
          <View className="flex-row items-center">
            <View className="w-16 h-16 rounded-full bg-primary/20 items-center justify-center">
              <User size={32} color="#FF8C69" />
            </View>
            <View className="flex-1 ml-4">
              <ThemeText variant="subtitle">{t("profile.user.name")}</ThemeText>
              <ThemeText tone="muted" className="text-sm mt-1">
                {t("profile.user.email")}
              </ThemeText>
            </View>
            <Pressable className="p-2">
              <Edit3 size={20} color="#FF8C69" />
            </Pressable>
          </View>
        </Card>

        {/* Stats */}
        <View className="mb-6">
          <View className="flex-row gap-4">
            <View className="flex-1 rounded-3xl p-4 bg-surface border border-background">
              <View className="flex-row items-center gap-2 mb-2">
                <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
                  <PawPrint size={16} color="#FF8C69" />
                </View>
                <ThemeText tone="muted" className="text-sm font-medium">
                  {t("profile.stats.pets")}
                </ThemeText>
              </View>
              <ThemeText className="text-2xl font-bold">
                {t("profile.stats.petsCount")}
              </ThemeText>
            </View>

            <View className="flex-1 rounded-3xl p-4 bg-surface border border-background">
              <View className="flex-row items-center gap-2 mb-2">
                <View className="w-8 h-8 rounded-full bg-accent/30 items-center justify-center">
                  <Crown size={16} color="#FFD700" />
                </View>
                <ThemeText tone="muted" className="text-sm font-medium">
                  {t("profile.stats.plan")}
                </ThemeText>
              </View>
              <ThemeText className="text-lg font-bold" numberOfLines={1}>
                {t("profile.stats.planValue")}
              </ThemeText>
            </View>
          </View>
        </View>

        {/* Premium Promo */}
        <View className="mb-6 rounded-3xl overflow-hidden shadow-lg">
          <LinearGradient
            colors={["#111827", "#1F2937"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View className="relative p-5">
              <View className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
              <View className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-primary/20" />

              <View className="flex-row items-start justify-between relative z-10">
                <View className="flex-1 pr-4">
                  <View className="self-start px-2 py-0.5 rounded-full bg-accent mb-2">
                    <ThemeText className="text-[10px] font-bold text-text-primary">
                      {t("profile.subscription.proLabel")}
                    </ThemeText>
                  </View>
                  <ThemeText className="text-lg font-bold text-white">
                    {t("profile.subscription.premiumTitle")}
                  </ThemeText>
                  <ThemeText className="text-sm text-white/70 mt-2">
                    {t("profile.subscription.premiumDesc")}
                  </ThemeText>
                  <Button
                    title={t("profile.subscription.upgradeButton")}
                    className="mt-4 self-start"
                    onPress={() => console.log("Upgrade")}
                  />
                </View>

                <Crown size={56} color="rgba(255,215,0,0.25)" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Pets & Health Section */}
        <View className="mb-5">
          <ThemeText className="text-text-secondary text-xs font-semibold uppercase mb-3 ml-1">
            {t("profile.sections.pets")}
          </ThemeText>
          <View className="gap-2">
            <ProfileMenuItem
              icon={PawPrint}
              title={t("profile.menu.managePets")}
              description={t("profile.menu.managePetsDesc")}
              onPress={() => console.log("Manage Pets")}
            />
            <ProfileMenuItem
              icon={Bookmark}
              title={t("profile.menu.savedServices")}
              description={t("profile.menu.savedServicesDesc")}
              onPress={() => console.log("Saved Services")}
            />
            <ProfileMenuItem
              icon={Calendar}
              title={t("profile.menu.appointments")}
              description={t("profile.menu.appointmentsDesc")}
              onPress={() => console.log("Appointments")}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View className="mb-5">
          <ThemeText className="text-text-secondary text-xs font-semibold uppercase mb-3 ml-1">
            {t("profile.sections.preferences")}
          </ThemeText>
          <View className="gap-2">
            <ProfileMenuItem
              icon={Bell}
              title={t("profile.menu.notifications")}
              description={t("profile.menu.notificationsDesc")}
              onPress={() => console.log("Notifications")}
            />
            <ProfileMenuItem
              icon={Languages}
              title={t("profile.menu.language")}
              description={getCurrentLanguage()}
              onPress={() => console.log("Language")}
            />
            <ProfileMenuItem
              icon={ShieldCheck}
              title={t("profile.menu.privacy")}
              description={t("profile.menu.privacyDesc")}
              onPress={() => console.log("Privacy")}
            />
          </View>
        </View>

        {/* Support Section */}
        <View className="mb-5">
          <ThemeText className="text-text-secondary text-xs font-semibold uppercase mb-3 ml-1">
            {t("profile.sections.support")}
          </ThemeText>
          <View className="gap-2">
            <ProfileMenuItem
              icon={HelpCircle}
              title={t("profile.menu.help")}
              description={t("profile.menu.helpDesc")}
              onPress={() => console.log("Help")}
            />
            <ProfileMenuItem
              icon={MessageCircle}
              title={t("profile.menu.contact")}
              description={t("profile.menu.contactDesc")}
              onPress={() => console.log("Contact")}
            />
          </View>
        </View>

        {/* About Section */}
        <View className="mb-5">
          <ThemeText className="text-text-secondary text-xs font-semibold uppercase mb-3 ml-1">
            {t("profile.sections.about")}
          </ThemeText>
          <View className="gap-2">
            <ProfileMenuItem
              icon={FileText}
              title={t("profile.menu.terms")}
              description={t("profile.menu.termsDesc")}
              onPress={() => console.log("Terms")}
            />
            <ProfileMenuItem
              icon={Info}
              title={t("profile.menu.about")}
              description={t("profile.menu.aboutDesc")}
              onPress={() => console.log("About")}
            />
          </View>
        </View>

        {/* Logout Button */}
        <View className="mb-8">
          <ProfileMenuItem
            icon={LogOut}
            title={t("profile.menu.logout")}
            description={t("profile.menu.logoutDesc")}
            onPress={handleLogout}
            showChevron={false}
            danger
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
