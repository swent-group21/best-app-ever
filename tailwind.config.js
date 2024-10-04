/** @type {import('tailwindcss').Config} */
module.exports = {
  /** Contains the directories where we can use tailwindcss **/
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  /** Here we have the theme of the app that will be used all throughout **/
  theme: {
    extend: {},
  },

  /** Other plugins that we could use **/
  plugins: [],
}

