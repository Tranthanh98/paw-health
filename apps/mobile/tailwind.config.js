/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FF8C69",
        secondary: "#20B2AA",
        accent: "#FFD700",
        background: "#F2F2F2",
        surface: "#FFFFFF",
        text: {
          primary: "#1A1A2E",
          secondary: "#6B7280",
        },
        error: "#EF4444",
        success: "#10B981",
      },
    },
  },
  plugins: [],
};
