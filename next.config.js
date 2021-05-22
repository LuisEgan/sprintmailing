const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
const nextTranslate = require("next-translate");
module.exports = withPlugins([withImages], nextTranslate());
