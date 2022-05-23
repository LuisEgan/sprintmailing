const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
const nextTranslate = require("next-translate");
const { parsed: myEnv } = require("dotenv").config({
  path: ".env",
});

const config = {
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
  images: {
    domains: ["storage.googleapis.com", "cdn.ndrz.io"],
  },
};

module.exports = withPlugins([withImages, nextTranslate], config);
