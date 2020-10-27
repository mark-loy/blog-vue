import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* 按需引入element-ui组件 */
import './plugins/element'
/* 导入公共js */
import './common/util'


Vue.config.productionTip = false

//在vue原型上挂载事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
