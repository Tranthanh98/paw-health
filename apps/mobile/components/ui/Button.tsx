import { Pressable, type PressableProps } from "react-native";
import { ThemeText } from "./ThemeText";

type ButtonVariant = "primary" | "secondary" | "accent" | "surface";

type ButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  className?: string;
  textClassName?: string;
};

const variantClassName: Record<ButtonVariant, string> = {
  primary: "bg-primary border-primary",
  secondary: "bg-secondary border-secondary",
  accent: "bg-accent border-accent",
  surface: "bg-surface border-background",
};

const textClassNameByVariant: Record<ButtonVariant, string> = {
  primary: "text-surface",
  secondary: "text-surface",
  accent: "text-text-primary",
  surface: "text-text-primary",
};

export function Button({
  title,
  variant = "primary",
  className = "",
  textClassName = "",
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={`h-12 items-center justify-center rounded-full border px-5 ${variantClassName[variant]} ${className}`.trim()}
      {...props}
    >
      <ThemeText
        className={`${textClassNameByVariant[variant]} ${textClassName}`.trim()}
      >
        {title}
      </ThemeText>
    </Pressable>
  );
}
