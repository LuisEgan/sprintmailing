module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
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
