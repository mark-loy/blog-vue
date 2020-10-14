const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    /* 配置别名 */
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("plugins", resolve("src/plugins"))
      .set("views", resolve("src/views"));
  }
}
