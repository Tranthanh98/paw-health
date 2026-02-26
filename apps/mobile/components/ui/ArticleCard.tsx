import { Image as ImageIcon } from "lucide-react-native";
import { Image, Pressable, View, type PressableProps } from "react-native";
import { ThemeText } from "./ThemeText";

type ArticleCardProps = PressableProps & {
  title: string;
  category: string;
  categoryColor?: string;
  categoryBgColor?: string;
  readTime?: string;
  imageUrl?: string;
  className?: string;
};

export function ArticleCard({
  title,
  category,
  categoryColor = "#2563EB",
  categoryBgColor = "#DBEAFE",
  readTime,
  imageUrl,
  className = "",
  ...props
}: ArticleCardProps) {
  return (
    <Pressable
      className={`flex-row gap-3 rounded-3xl bg-surface border border-background p-3 shadow-sm ${className}`.trim()}
      {...props}
    >
      {/* Image */}
      <View className="w-20 h-20 rounded-3xl overflow-hidden bg-background">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View
            className="w-full h-full items-center justify-center"
            style={{ backgroundColor: categoryBgColor }}
          >
            <ImageIcon size={32} color={categoryColor} />
          </View>
        )}
      </View>

      {/* Content */}
      <View className="flex-1 justify-between py-1">
        <ThemeText
          className="text-sm font-bold leading-tight"
          numberOfLines={2}
        >
          {title}
        </ThemeText>

        <View className="flex-row items-center gap-2">
          <View
            className="rounded px-1.5 py-0.5"
            style={{ backgroundColor: categoryBgColor }}
          >
            <ThemeText
              className="text-xs font-medium"
              style={{ color: categoryColor }}
            >
              {category}
            </ThemeText>
          </View>
          {readTime && (
            <>
              <ThemeText className="text-xs" tone="muted">
                •
              </ThemeText>
              <ThemeText className="text-xs" tone="muted">
                {readTime}
              </ThemeText>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
}
