const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
const nextTranslate = require("next-translate");
const config = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL,
  },
};
module.exports = withPlugins([withImages], nextTranslate(config));
