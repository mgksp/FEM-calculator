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

        headerTxt: "hsl(var(--color-header-txt) / <alpha-value>)",
        primaryTxt: "hsl(var(--color-primary-txt) / <alpha-value>)",
        secondaryTxt: "hsl(var(--color-secondary-txt) / <alpha-value>)",
        accentTxt: "hsl(var(--color-accent-txt) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
