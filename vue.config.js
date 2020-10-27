const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  /* 配置别名 */
  configureWebpack: {
    resolve: {
      alias: {
        "@": "src",
        "assets": resolve("src/assets"),
        "common": resolve("src/common"),
        "components": resolve("src/components"),
        "plugins": resolve("src/plugins"),
        "views": resolve("src/views")
      }
    }
  },
  devServer: {
    proxy: { //配置跨域
      '/github': {
        target: 'https://github.com', // 跨域的目标地址
        changOrigin: true, // 允许跨域
        pathRewrite: { // 路径重写
          '^/github': ''
        }
      },
      '/getUser': {
        target: 'https://api.github.com',
        changOrigin: true, // 允许跨域
        pathRewrite: { // 路径重写
          '^/getUser': ''
        }      
      },
    }
  },


}
