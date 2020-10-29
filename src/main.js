import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* 按需引入element-ui组件 */
import './plugins/element'
/* 导入公共js */
import './common/util'
/* 引入富文本编辑器组件 */
import './plugins/quill-editor'
/* 引入lodash */
import _ from 'lodash'


Vue.config.productionTip = false

// 开启vue的调试工具
Vue.config.devtools = true

//在vue原型上挂载事件总线
Vue.prototype.$bus = new Vue()
// 将深拷贝 挂载到Vue原型上
Vue.prototype._ = _

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
