import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* 解决重复点击路由异常问题 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const home = () => import('views/home/Home.vue')
const category = () => import('views/category/Category.vue')

const routes = [
  { path: '/', redirect: '/home'},
  { path: '/home', component: home },
  { path: '/category', component: category }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
