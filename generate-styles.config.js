const { merge } = require("webpack-merge");
const multipleThemesCompile = require("webpack-multiple-themes-compile");
const path = require("path");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
const themes = require("./themes.config");

const commonConfig = {
  output: {
    filename: "[name].bundle.js?[hash]",
    path: path.resolve(__dirname, "public/themes"),
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["transform-loader?brfs", "babel-loader?babelrc"],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          zindex: {
            disabled: true,
          },
        },
        canPrint: true,
      }),
    ],
  },
  plugins: [],
};

const themeConfig = multipleThemesCompile({
  themesConfig: themes,
  styleLoaders: [
    { loader: "css-loader" },
    {
      loader: "less-loader",
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  ],
  cwd: path.resolve("./"),
});

module.exports = merge(commonConfig, themeConfig);
