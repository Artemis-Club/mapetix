/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      thin: ["KumbhSans_100Thin", "sans-serif"],
      regular: ["KumbhSans_400Regular", "sans-serif"],
      bold: ["KumbhSans_800ExtraBold", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
