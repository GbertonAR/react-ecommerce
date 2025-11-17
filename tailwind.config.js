/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        flowPurple: "#8A2BE2",
        flowBlue: "#00BFFF",
        flowMagenta: "#FF1493",
        flowRed: "#F15BB5",
        flowElectric: "#007BFF",

        flowDark: "#0a0a23",
        flowDark2: "#111121",
        flowBg: "#1a1a2e",

        flowPrimary: "#6C5CE7",
        flowSecondary: "#00CEC9",
        flowGray: "#b2bec3",
        customDark: "#0a0a23",
      },
    },
  },
  plugins: [],
};
