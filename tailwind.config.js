/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "wallpaper":"url('src/assets/images/fondo.jpg')"
      },

    },
  },
  plugins: [],
}