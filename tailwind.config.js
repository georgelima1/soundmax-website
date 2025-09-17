/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb", // blue-600
          dark: "#1d4ed8",
          light: "#3b82f6",
        },
        bg: {
          DEFAULT: "#0B0B0C",
          soft: "#131315",
          card: "#141416"
        }
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(0,0,0,0.45)",
      },
      maxWidth: {
        wrap: "1200px"
      }
    },
  },
  plugins: [],
};
