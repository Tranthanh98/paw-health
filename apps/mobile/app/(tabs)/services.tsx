import {
  CategoryButton,
  Header,
  NearbyHeader,
  PromoCard,
  SearchBar,
  SectionHeader,
  ServiceCard,
  type CategoryItem,
  type ServiceCardData,
} from "@/components/services";
import { PawPrint, Scissors, Stethoscope, Store } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServicesScreen() {
  const { t } = useTranslation();

  const categories: CategoryItem[] = [
    {
      key: "vet",
      label: t("services.categories.vet"),
      icon: Stethoscope,
      tone: "primary",
    },
    {
      key: "shop",
      label: t("services.categories.shop"),
      icon: Store,
      tone: "secondary",
    },
    {
      key: "sitter",
      label: t("services.categories.sitter"),
      icon: PawPrint,
      tone: "success",
    },
    {
      key: "spa",
      label: t("services.categories.spa"),
      icon: Scissors,
      tone: "accent",
    },
  ];

  const services: ServiceCardData[] = [
    {
      key: "clinic",
      name: t("services.providers.clinic.name"),
      address: t("services.providers.clinic.address"),
      rating: t("services.providers.clinic.rating"),
      distance: t("services.providers.clinic.distance"),
      image: t("services.providers.clinic.image"),
      badge: {
        label: t("services.badges.verified"),
        tone: "secondary",
        withIcon: true,
      },
      tags: [
        {
          key: "vet",
          label: t("services.tags.vet"),
          tone: "secondary",
        },
        {
          key: "grooming",
          label: t("services.tags.grooming"),
          tone: "accent",
        },
        {
          key: "vaccine",
          label: t("services.tags.vaccine"),
          tone: "success",
        },
      ],
      metaLabel: t("services.cards.openLabel"),
      metaValue: t("services.cards.openUntil", {
        time: t("services.times.closeAt"),
      }),
      metaTone: "success",
      actionLabel: t("services.cards.bookNow"),
    },
    {
      key: "store",
      name: t("services.providers.store.name"),
      address: t("services.providers.store.address"),
      rating: t("services.providers.store.rating"),
      distance: t("services.providers.store.distance"),
      image: t("services.providers.store.image"),
      badge: {
        label: t("services.badges.bestSeller"),
        tone: "primary",
      },
      tags: [
        {
          key: "shop",
          label: t("services.tags.shop"),
          tone: "primary",
        },
        {
          key: "accessories",
          label: t("services.tags.accessories"),
          tone: "accent",
        },
      ],
      metaLabel: t("services.cards.fromLabel"),
      metaValue: t("services.cards.fromPrice", {
        price: t("services.prices.store"),
      }),
      metaTone: "default",
      actionLabel: t("services.cards.shopNow"),
    },
    {
      key: "hotel",
      name: t("services.providers.hotel.name"),
      address: t("services.providers.hotel.address"),
      rating: t("services.providers.hotel.rating"),
      distance: t("services.providers.hotel.distance"),
      image: t("services.providers.hotel.image"),
      tags: [
        {
          key: "sitter",
          label: t("services.tags.sitter"),
          tone: "success",
        },
        {
          key: "boarding",
          label: t("services.tags.boarding"),
          tone: "muted",
        },
      ],
      metaLabel: t("services.cards.fromLabel"),
      metaValue: t("services.cards.fromPrice", {
        price: t("services.prices.hotel"),
      }),
      metaTone: "default",
      actionLabel: t("services.cards.bookNow"),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="px-5 pt-4 pb-2">
          <Header
            greeting={t("services.greeting")}
            name={t("services.userName")}
          />
          <SearchBar placeholder={t("services.searchPlaceholder")} />
        </View>

        <View className="gap-6 pt-4">
          <SectionHeader
            title={t("services.sections.categories")}
            actionLabel={t("common.seeAll")}
          />
          <View className="flex-row flex-wrap px-5" style={{ gap: 12 }}>
            {categories.map((category) => (
              <CategoryButton key={category.key} item={category} />
            ))}
          </View>

          <View className="px-5">
            <PromoCard
              eyebrow={t("services.promo.eyebrow")}
              title={t("services.promo.title")}
              actionLabel={t("services.promo.cta")}
            />
          </View>

          <View className="gap-4">
            <View className="px-5">
              <NearbyHeader
                title={t("services.sections.nearby")}
                location={t("services.location")}
              />
            </View>
            <View className="gap-4 px-5">
              {services.map((service) => (
                <ServiceCard key={service.key} data={service} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
