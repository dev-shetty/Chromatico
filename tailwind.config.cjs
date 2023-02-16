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
          100: "#edf2fb",
          200: "#e2eafc",
          400: "#d7e3fc",
          500: "#ccdbfd",
          600: "#c1d3fe",
          700: "#b6ccfe",
          800: "#abc4ff",
        },
      },
    },
  },
  plugins: [],
}
