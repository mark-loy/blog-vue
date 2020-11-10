const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    // 生产环境
    config.when(process.env.NODE_ENV === 'production', config => {
      // 配置生产环境入口文件
      config.entry('app').clear().add('./src/prod.js')
      // 配置需要加载的cdn资源名
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        axios: 'axios',
        loadsh: '_',
        nprogress: 'nprogress',
        'mavon-editor': 'mavonEditor',
      })
      // 配置首页title的标识符
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 测试环境
    config.when(process.env.NODE_ENV === 'development', config => {
      // 配置测试环境入口文件
      config.entry('app').clear().add('./src/dev.js')
      // 配置首页title的标识符
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },
  css: {
    extract: false
  },
  configureWebpack: {
    resolve: {
      /* 配置别名 */
      alias: {
        "@": "src",
        "assets": resolve("src/assets"),
        "common": resolve("src/common"),
        "components": resolve("src/components"),
        "plugins": resolve("src/plugins"),
        "views": resolve("src/views"),
        "store": resolve("src/store")
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
