import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 导入公共js */
import './common/util'
/* 引入lodash */
import _ from 'lodash'
/* 引入富文本编辑器 */
import mavonEditor from "mavon-editor";
Vue.use(mavonEditor)

Vue.config.productionTip = false

//在vue原型上挂载事件总线
Vue.prototype.$bus = new Vue()

// 将深拷贝 挂载到Vue原型上
Vue.prototype._ = _

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
