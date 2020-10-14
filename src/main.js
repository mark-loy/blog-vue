import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* 按需引入element-ui组件 */
import './plugins/element'
/* 导入公共js */
import './common/util'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
