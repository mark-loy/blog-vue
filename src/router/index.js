import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

/* 解决重复点击路由异常问题 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const home = () => import('views/home/Home')
const category = () => import('views/category/Category')
const tag = () => import('views/tag/Tag')
const timeLine = () => import('views/timeLine/TimeLine')

const routes = [
  { path: '/', redirect: '/home', },
  { path: '/home', component: home, name: 'home' },
  { path: '/category', component: category, name: 'cate' },
  { path: '/tag', component: tag, name: 'tag' },
  { path: '/time', component: timeLine, name: 'time'}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*前置导航守卫；对未登录的用户进行拦截*/
router.beforeEach((to, from, next) => {
  return next()
})

/* 后置导航守卫， */
router.afterEach((to, from) => {
  // 发射当前路由切换事件
  router.app.$bus.$emit('tabMenu', to.name)
})

export default router
