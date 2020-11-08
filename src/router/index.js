import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

/* 解决重复点击路由异常问题 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 前台页面展示路由
const home = () => import('views/home/Home')
const category = () => import('views/category/Category')
const tag = () => import('views/tag/Tag')
const timeLine = () => import('views/timeLine/TimeLine')
const article = () => import('views/article/Article')
const message = () => import('views/message/Message')
const login = () => import('components/common/login/Login')

// 后台管理路由
const welcome = () => import('views/back/welcome/Welcome')
const adminLogin = () => import('views/back/login/BackLogin')
const backHome = () => import('views/back/BackHome')
const backArticle = () => import('views/back/article/Article')
const backAddArticle = () => import('views/back/article/AddArticle')
const backCategory = () => import('views/back/category/Category')
const backTag = () => import('views/back/tag/Tag')
const backVisitor = () => import('views/back/user/Visitor')
const backAdmin = () => import('views/back/user/Admin')
const backInform = () => import('views/back/inform/Inform')
const routes = [{
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: home,
    name: 'home'
  },
  {
    path: '/category',
    component: category,
    name: 'category'
  },
  {
    path: '/tag',
    component: tag,
    name: 'tag'
  },
  {
    path: '/time',
    component: timeLine,
    name: 'time'
  },
  {
    path: '/article/:id',
    component: article,
    name: 'article'
  },
  {
    path: '/message',
    component: message,
    name: 'message'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/admin/login',
    component: adminLogin,
    name: 'adminLogin'
  },
  {
    path: '/back',
    component: backHome,
    children: [{
        path: '',
        component: welcome,
        name: 'backWelcome'
      },
      {
        path: 'article',
        component: backArticle,
        name: 'backArticle'
      },
      {
        path: 'article/add',
        component: backAddArticle,
        name: 'backAddArticle'
      },
      {
        path: 'category',
        component: backCategory,
        name: 'backCategory'
      },
      {
        path: 'tag',
        component: backTag,
        name: 'backTag'
      },
      {
        path: 'visitor',
        component: backVisitor,
        name: 'backVisitor'
      },
      {
        path: 'admin',
        component: backAdmin,
        name: 'backAdmin'
      },
      {
        path: 'inform',
        component: backInform,
        name: 'backInform'
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*前置导航守卫；对未登录的用户进行拦截*/
router.beforeEach((to, from, next) => {

  if (to.path.indexOf('back') !== -1) {
    const admin_token = window.sessionStorage.getItem('admin-token')
    if (admin_token === null || admin_token === '') {
      return next('/admin/login')
    }
  }

  return next()
})

/* 后置导航守卫， */
router.afterEach((to, from) => {
  // 发射要跳转的路由切换事件
  router.app.$bus.$emit('tabRouter', to.name)
})

export default router
