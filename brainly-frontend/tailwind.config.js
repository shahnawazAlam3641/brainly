/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          600: "#4644D6",
          200: "#4644d62b",
        },
      },
    },
  },
  plugins: [],
};
