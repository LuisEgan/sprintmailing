const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
const nextTranslate = require("next-translate");

const config = {
  serverRuntimeConfig: {
    NEXT_PUBLIC_APP_API_URL:
      "https://nest-generic-backend-xlqdbkwfma-ue.a.run.app/graphql",
  },
};

module.exports = withPlugins([withImages], nextTranslate(config));
