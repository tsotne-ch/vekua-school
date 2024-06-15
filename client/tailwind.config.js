const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    fontFamily: {
      alk: ['"ALK Rounded Mtav Med"', "sans-serif"],
      glaho: ['"BPG Glaho Traditional"', "sans-serif"],
    },
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(1rem)" },
          "50%": { transform: "translateY(0rem)" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(1rem)" },
          "50%": { transform: "translateX(0rem)" },
        },
        header: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        floatIn: {
          "0%": { transform: "translateY(2rem)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        wave: "wave 4s ease-in-out infinite",
        header: "header 0.3s ease-out forwards",
        floatIn: "floatIn 0.7s ease-out forwards",
        floatLater: "floatIn 0.8s ease-out 0.4s forwards",
      },
      backgroundImage: {
        "header-image": "url('/public/images/mathboard.jpeg')",
        "beta-image": "url('/public/images/cos.jpg')",
        grid: "url('/public/images/dots.png')",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
