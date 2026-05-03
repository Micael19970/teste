import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#f4f4f5",
        neon: {
          purple: "#b026ff",
          blue: "#00f0ff",
        },
        dark: {
          100: "#171717",
          200: "#262626",
          300: "#404040",
        }
      },
    },
  },
  plugins: [],
};
export default config;
