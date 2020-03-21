// eslint-disable-next-line
require = require("esm")(module);
require("module-alias/register");
module.exports = require("./migration_engine");
