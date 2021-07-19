module.exports = {
  dark: {
    import: ["~rsuite/lib/styles/themes/dark/index"],
    "base-color": process.env.NEXT_PUBLIC_BASE_COLOR || "#ff0657",
  },
  light: {
    import: ["~rsuite/lib/styles/themes/default/index"],
    "base-color": process.env.NEXT_PUBLIC_BASE_COLOR || "#ff0657",
  },
};
