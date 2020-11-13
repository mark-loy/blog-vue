import axios from 'axios'
/* 导入baseURL */
import {baseUrl} from '../envParams'

/* 导入进度条插件js */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/* 访客发起的网络请求 */
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    NProgress.start()
    const visitor_token = window.sessionStorage.getItem("visitor-token")
    if (visitor_token !== null && visitor_token !== "") {
      config.headers["Authorization"] = visitor_token
    }
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    NProgress.done()
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}


/* admin发起的网络请求 */
export function adminRequest(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    NProgress.start()
    const admin_token = window.sessionStorage.getItem("admin-token")
    if (admin_token !== null || admin_token !== "") {
      config.headers["Authorization"] = admin_token
    }
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    NProgress.done()
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}

/* 跨域网络请求 */
export function crossRequest(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    timeout: 5000
  })

  // 2.1.请求拦截
  instance.interceptors.request.use(config => {
    
    return config
  }, err => {
    // console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}

