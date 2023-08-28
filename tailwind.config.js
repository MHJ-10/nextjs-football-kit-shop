/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lalezar: ["Lalezar", "cursive"],
      },
      colors: {
        c1: "#E7F6F2",
        c2: "#395B64",
        c3: "#A5C9CA",
        c4: "#2C3333",
      },
      screens: {
        mobileS: "300px",
        mobileM: "480px",
        mobileL: "601px",
        tabletS: "768px",
        tabletL: "992px",
        desktop: "1200px",
      },
    },
  },
  plugins: [],
};
