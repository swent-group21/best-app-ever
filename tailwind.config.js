/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E6BC95", // Replace with your primary color
        secondary: "#000", // Black for text and other elements
        lightGray: "#ccc", // Light gray color used for borders
        transparentGray: "#F5F5F5",
      },
      spacing: {
        "1/20": "5%", // Margin or padding equivalent to 5%
        "1/10": "10%", // Margin or padding equivalent to 10%
      },
      borderRadius: {
        xl: "15px", // Standard for button and input radii
        full: "9999px", // Full radius for round shapes
      },
      fontSize: {
        lg: "56px", // Large titles
        base: "20px", // Standard text size
      },
      width: {
        18: "18px",
        "40p": "40%", // 40% width allocation
        "60p": "60%", // 60% width allocation
        "80p": "80%", // 80% width allocation
        "90p": "90%", // 90% width allocation
      },
      height: {
        6: "6px",
        "5v": "5vh", // 5% of view height
        "10v": "10vh", // 10% of view height
      },
      lineHeight: {
        normal: "normal",
        relaxed: "1.625",
      },
      letterSpacing: {
        wide: ".025em",
        wider: ".05em",
      },
      positioning: {
        index: {
          bottom: 60,
        },
      },
    },
  },
  plugins: [],
};
