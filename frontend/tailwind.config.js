/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
