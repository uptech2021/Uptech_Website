import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#448CFF",
        "brand-deep": "#2C66D6",
        "brand-700": "#1E4FB8",
        navy: { DEFAULT: "#0C1F46", deep: "#081634" },
        paper: "#FFFFFF",
        mist: { DEFAULT: "#F1F6FF", 2: "#E7F0FF" },
        line: "#DDE7F7",
        accent: { DEFAULT: "#FDE047", deep: "#F4C500", ink: "#11203F" },
        ink: { DEFAULT: "#0E1B33", soft: "#4A5876" },
        "on-blue": "#EAF2FF",
      },
      borderRadius: {
        card: "22px",
        "card-sm": "14px",
      },
      boxShadow: {
        card: "0 18px 44px -22px rgba(12,31,70,.42)",
        "card-lg": "0 40px 80px -34px rgba(12,31,70,.55)",
        glow: "0 10px 24px -10px rgba(244,197,0,.8)",
        "glow-blue": "0 12px 26px -12px rgba(68,140,255,.85)",
      },
      fontFamily: {
        sans: ['"THICCCBOI"', "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-delay": "float 5s ease-in-out infinite 0.8s",
      },
    },
  },
  plugins: [],
} satisfies Config;
