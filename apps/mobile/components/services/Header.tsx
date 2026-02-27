import { ThemeText } from "@/components/ui";
import { Bell } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { themeColors } from "./types";

type HeaderProps = {
  greeting: string;
  name: string;
};

export function Header({ greeting, name }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <View className="w-12 h-12 rounded-full border-2 border-primary p-0.5">
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDahnlPvepPcb50Wy5rsF3cU6oKL-bh6pShF_yOuD_4X0C3EtwcLKVbS-1-Ok018Xk_pLqVYQA6KNpoJr6MfQDPfXVzBbuApz4XGzqMLMLqD_PgbZqu-iYr-5BfCOG04rGtUwAur-mVg6b_iIpynB4Ummd-w974TpuThrICEsWeKgxgGxfVm5xBis9capcxbGE2iy54yfQhUPhzMYryLoyUlSzM4PLTQVPag4lLgDqs-vPcJfOnv6xUGxNEfHOCC30SnPU3UTmdB1IQ",
            }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-success border-2 border-surface" />
        </View>
        <View>
          <ThemeText className="text-xs font-medium" tone="muted">
            {greeting}
          </ThemeText>
          <ThemeText className="text-lg font-bold">{name}</ThemeText>
        </View>
      </View>
      <Pressable className="relative w-10 h-10 items-center justify-center rounded-full bg-surface">
        <Bell size={22} color={themeColors.textPrimary} />
        <View className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-error border-2 border-surface" />
      </Pressable>
    </View>
  );
}
