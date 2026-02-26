import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paw Health - Pet Care Platform",
  description:
    "All-in-one ecosystem for pet owners to manage their pet's health, nutrition, shopping and care services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
