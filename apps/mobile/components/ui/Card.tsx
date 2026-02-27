import { View, type ViewProps } from "react-native";

type CardProps = ViewProps & {
  className?: string;
};

export function Card({ className = "", ...props }: CardProps) {
  return (
    <View
      className={`rounded-[28px] border border-background bg-surface p-5 shadow-sm ${className}`.trim()}
      {...props}
    />
  );
}
