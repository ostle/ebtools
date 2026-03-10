/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          charcoal: "#1a1d21",
          "charcoal-light": "#2d3238",
          "charcoal-muted": "#3d434a",
          white: "#f5f5f5",
          offwhite: "#e8e8e8",
          orange: "#f59e0b",
          "orange-dark": "#d97706",
          "orange-bright": "#fbbf24",
          yellow: "#facc15",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Bebas Neue", "Impact", "sans-serif"],
      },
      boxShadow: {
        industrial: "0 4px 14px 0 rgba(0, 0, 0, 0.25)",
        "industrial-lg": "0 8px 24px 0 rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
}
