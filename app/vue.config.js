// vue.config.js

process.env.VUE_APP_VERSION = require("./package.json").version

// Probably possible to do this in a nicer way
process.env.VUE_APP_MO_BASEURL = require("./public/settings.json").mo_base_url
process.env.VUE_APP_ROOT_UUID = require("./public/settings.json").root_uuid
process.env.VUE_APP_PERSON_RELATION = require("./public/settings.json").person_relation
process.env.VUE_APP_ORG_UNIT_HIERARCHY_UUIDS =
  require("./public/settings.json").org_unit_hierarchy_uuids
process.env.VUE_APP_TITLE = require("./public/settings.json").title
process.env.VUE_APP_CUSTOM_CSS = require("./public/settings.json").custom_css
process.env.VUE_APP_TREE_LAYOUT = require("./public/settings.json").tree_layout
process.env.VUE_APP_LOGO_SRC = require("./public/settings.json").logo_src
process.env.VUE_APP_HIDE_ORG_UNIT_UUIDS =
  require("./public/settings.json").hide_org_unit_uuids
process.env.VUE_APP_HIDE_MANAGER_ORG_UNITS =
  require("./public/settings.json").hide_manager_org_units
process.env.VUE_APP_USE_AUTOCOMPLETE_API =
  require("./public/settings.json").use_autocomplete_api

module.exports = {
  outputDir: "dist",
  publicPath: "", // serve assets under a relative path.
  productionSourceMap: false,
  transpileDependencies: ["non-layered-tidy-tree-layout"],
}
