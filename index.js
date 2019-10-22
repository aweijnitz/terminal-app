// Set options as a parameter, environment variable, or rc file.
// See https://www.npmjs.com/package/esm
require = require("esm")(module, {
  "cache": false,
  "sourceMap": true,
  "await": true,
  "mode":"auto",
  
});
module.exports = require("./app.js");