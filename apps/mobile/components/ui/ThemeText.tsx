import { Text, type TextProps } from "react-native";

type ThemeTextVariant = "title" | "subtitle" | "body" | "caption";
type ThemeTextTone = "default" | "primary" | "secondary" | "accent" | "muted";

type ThemeTextProps = TextProps & {
  variant?: ThemeTextVariant;
  tone?: ThemeTextTone;
  className?: string;
};

const variantClassName: Record<ThemeTextVariant, string> = {
  title: "text-3xl font-bold",
  subtitle: "text-xl font-semibold",
  body: "text-base font-normal",
  caption: "text-sm font-medium",
};

const toneClassName: Record<ThemeTextTone, string> = {
  default: "text-text-primary",
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  muted: "text-text-secondary",
};

export function ThemeText({
  variant = "body",
  tone = "default",
  className = "",
  ...props
}: ThemeTextProps) {
  return (
    <Text
      className={`${variantClassName[variant]} ${toneClassName[tone]} ${className}`.trim()}
      {...props}
      style={{ fontFamily: "SFProRounded" }}
    />
  );
}
