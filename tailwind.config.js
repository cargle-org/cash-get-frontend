/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cash-get": {
          dark: "#000000",
          "dark-500": "#0D0D0D",
          "dark-400": "#262626",
          "dark-300": "#595959",
          "dark-200": "#A6A6A6",
          "dark-100": "#F2F2F2",
          white: "#FFFFFF",
          red: "#2d0709",
          green: "#071908",
          blue: "#001141",
          "light-blue": "#F5F9FF"
        }
      }
    },
  },
  plugins: [],
}

