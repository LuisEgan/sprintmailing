module.exports = {
  purge: ["./src/**/*.tsx", "./src/**/*.scss", "./src/**/*.less"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        screen: ["100vh", "-webkit-fill-available"],
      },
      colors: {
        current: {
          500: "#ff0657",
        },
        black: "#090C10",
        gray: {
          900: "#161B22",
        },
      },
    },
  },
  variants: {
    extend: { display: ["dark"] },
  },
  plugins: [],
};
