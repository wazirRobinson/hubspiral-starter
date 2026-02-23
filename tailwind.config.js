module.exports = {
  content: [
    "./views/**/*.handlebars",
    "./views/**/*.hbs",
    "./public/**/*.js",
    "./src/**/*.{css,js}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#ffffff",
          100: "#ddcfb2",
          300: "#b58956",
          900: "#311700",
        },
      },
      boxShadow: {
        surface: "0 6px 16px rgba(49, 23, 0, 0.20)",
        "surface-soft": "0 3px 8px rgba(49, 23, 0, 0.12)",
      },
    },
  },
  plugins: [],
}
