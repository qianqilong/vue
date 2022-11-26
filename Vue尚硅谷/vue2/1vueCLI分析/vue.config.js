// vue.config.js
// const ScriptSetup = require("unplugin-vue2-script-setup/webpack").default;

module.exports = {
  parallel: false, // disable thread-loader, which is not compactible with this plugin
  lintOnSave: false, //取消
  configureWebpack: {
    plugins: [
      // ScriptSetup({
      //   /* options */
      // }),
    ],
  },
};
