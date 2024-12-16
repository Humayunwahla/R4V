/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        dmSans: ['DM Sans', 'sans-serif'],
        Manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

