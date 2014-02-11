var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

var modded_page = pageMod.PageMod({
  include: "*",
  contentScriptFile: self.data.url("dogeify.js")
});