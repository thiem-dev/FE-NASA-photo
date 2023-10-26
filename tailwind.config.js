/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'my-bg': "url('../public/space1md.jpg')",
      }
    },
  },
  plugins: [],
}