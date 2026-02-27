import type React from "react";

export type IconComponent = React.ComponentType<{
  size?: number;
  color?: string;
}>;

export const themeColors = {
  primary: "#FF8C69",
  secondary: "#20B2AA",
  accent: "#FFD700",
  background: "#FAFAFA",
  surface: "#FFFFFF",
  textPrimary: "#1A1A2E",
  textSecondary: "#6B7280",
  success: "#10B981",
  error: "#EF4444",
};

export type CategoryItem = {
  key: string;
  label: string;
  icon: IconComponent;
  tone: "primary" | "secondary" | "accent" | "success";
};

export type ServiceTag = {
  key: string;
  label: string;
  tone: "primary" | "secondary" | "accent" | "success" | "muted";
};

export type ServiceCardData = {
  key: string;
  name: string;
  address: string;
  rating: string;
  distance: string;
  image: string;
  badge?: {
    label: string;
    tone: "primary" | "secondary" | "accent";
    withIcon?: boolean;
  };
  tags: ServiceTag[];
  metaLabel: string;
  metaValue: string;
  metaTone: "success" | "default";
  actionLabel: string;
};

export const categoryToneStyles: Record<
  CategoryItem["tone"],
  { container: string; icon: string }
> = {
  primary: { container: "bg-primary/10", icon: themeColors.primary },
  secondary: { container: "bg-secondary/10", icon: themeColors.secondary },
  accent: { container: "bg-accent/20", icon: themeColors.accent },
  success: { container: "bg-success/10", icon: themeColors.success },
};
