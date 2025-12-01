import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        sans: ["Urbanist", "sans-serif"],
      },
      colors: {
        current: "currentColor",
        transparent: "transparent",
        white: "#FFFFFF",
        black: "#1A1919",
        black2: "#2A2929",
        primary: "#3377D4",
        secondary: "#FF2727",
        "primary-text": "#16417B",
        "light-primary-bg": "#F5F7FF",
        "secondary-50": "#FBFFF1",
        "secondary-100": "#8C8C8C",
        "secondary-200": "#69E59E",
        "dark-blue": "#00429D",

        // Purple Shades
        "purple-60": "#703BF7",
        "purple-65": "#8254F8",
        "purple-70": "#946CF9",
        "purple-75": "#A685FA",
        "purple-90": "#DBCEFD",
        "purple-95": "#EDE7FE",
        "purple-97": "#F4F0FE",
        "purple-99": "#FBFAFF",

        // White Shades
        "light-90": "#E4E4E7",
        "light-95": "#F1F1F3",
        "light-97": "#F7F7F8",
        "light-99": "#FCFCFD",

        // Grey Shades
        grey: "#565D70",
        "grey-10": "#D6D7D9",
        "grey-02": "#656575",
        "grey-04": "#F8F7F1",
        "grey-30": "#4D4D4D",
        "grey-40": "#666666",
        "grey-50": "#808080",
        "grey-60": "#999999",
        "grey-bg": "#1E1E1E",

        "qidient-yellow": "#FFA229",
        "qidient-yellow-light": "#AA7D3D",

        "qidient-blue": "#E2F5FE",
        "qidient-blue-light": "#3D60AA",

        "qidient-purple": "#7B55E8",
        "qidient-purple-light": "#593DAA",

        "qidient-light-green": "#55E8B5",
        "qidient-light-green-light": "#3DAA88",

        "qidient-gray": "#2B2B2D",
        "qidient-gray-light": "#201F22",
        "qidient-gray-text": "#44464C",

        "qidient-red": "#FF2727",
        "qidient-light-red": "#FE7A87",
        "qidient-red-text": "#A8143A",

        "qidient-green": "#52C93F",

        "qidient-orange": "#FFC983",
        "qidient-orange-text": "#B06E17",

        "qidient-gray--300": "#D7D7D7",
        "qidient-gray--400": "#8E8E93",
        "qidient-gray--500": "#48484A",
        "qidient-gray--600": "#374151",
        "qidient-gray--700": "#4B5563",
        "qidient-red-100": "#FFB3AE",
        "qidient-red-200": "#FF3B30",
        "qidient-orange-100": "#FFDCAA",
        "qidient-teal-100": "#A7E3FF",
        "qidient-teal-200": "#5AC8FA",
        "system-gray-dark-200": "#48484A",
        "system-gray-dark-300": "#25252C",
        "qidient-accent": "#0F0C36",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
