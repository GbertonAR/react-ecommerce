/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        flowPurple: "#8A2BE2",   // púrpura vibrante
        flowBlue: "#00BFFF",     // azul eléctrico
        flowMagenta: "#FF1493",  // magenta intenso
        flowRed: "#F15BB5",      // rojo AI del contador
        flowElectric: "#007BFF", // azul eléctrico para fondos
      },
    },
  },
  plugins: [],
};


