/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        leagueSpartan: ["League Spartan", "sans-serif"],
      },
      colors: {
        main: "hsl(var(--color-main-bg) / <alpha-value>)",
        keypad: "hsl(var(--color-keypad) / <alpha-value>)",
        screen: "hsl(var(--color-screen) / <alpha-value>)",

        primaryKey: "hsl(var(--color-primary-key) / <alpha-value>)",
        primaryKeyShadow:
          "hsl(var(--color-primary-key-shadow) / <alpha-value>)",
        secondaryKey: "hsl(var(--color-secondary-key) / <alpha-value>)",
        secondaryKeyShadow:
          "hsl(var(--color-secondary-key-shadow) / <alpha-value>)",
        accentKey: "hsl(var(--color-accent-key) / <alpha-value>)",
        accentKeyShadow: "hsl(var(--color-accent-key-shadow) / <alpha-value>)",

        text1: "hsl(var(--color-text1) / <alpha-value>)",
        text2: "hsl(var(--color-text2) / <alpha-value>)",
        text3: "hsl(var(--color-text3) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
