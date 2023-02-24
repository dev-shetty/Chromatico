/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Shades of Violet
        // primary: {
        //   100: "#E5D9F2",
        //   300: "#F5EFFF",
        //   500: "#CDC1FF",
        //   700: "#A594F9",
        //   900: "#7371FC",
        // },

        // Shades of Blue
        primary: {
          100: "#FFFFFF",
          900: "#000000",
        },
        accent: {
          300: "#FFD35C",
          500: "#FFBE0B",
        },
        secondary: "#FB5607",
      },
      fontFamily: {
        chromatico: ["Cursive-Chromatico", "cursive"],
      },
    },
  },
  plugins: [],
}
