import { View, type ViewProps } from "react-native";
import { ThemeText } from "./ThemeText";

type PillTone = "primary" | "secondary" | "accent" | "success" | "error";

type PillProps = ViewProps & {
  label: string;
  tone?: PillTone;
  className?: string;
};

const toneClassName: Record<PillTone, string> = {
  primary: "border-primary bg-background",
  secondary: "border-secondary bg-background",
  accent: "border-accent bg-background",
  success: "border-success bg-background",
  error: "border-error bg-background",
};

const textToneClassName: Record<PillTone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  success: "text-success",
  error: "text-error",
};

export function Pill({
  label,
  tone = "primary",
  className = "",
  ...props
}: PillProps) {
  return (
    <View
      className={`self-start rounded-full border px-3 py-1 ${toneClassName[tone]} ${className}`.trim()}
      {...props}
    >
      <ThemeText variant="caption" className={textToneClassName[tone]}>
        {label}
      </ThemeText>
    </View>
  );
}
