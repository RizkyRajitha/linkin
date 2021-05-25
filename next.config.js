const pkg = require("./package.json");

module.exports = {
  env: {
    VERSION: pkg.version,
  },
  basePath: "",
};
