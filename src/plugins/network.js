import axios from 'axios'
/* 导入进度条插件js、css */
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

/* 普通网络请求 */
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://localhost:8888/',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    nprogress.start()
    const visitor_token = window.sessionStorage.getItem("visitor-token")
    if (visitor_token !== null || visitor_token !== "") {
      config.headers["Authorization"] = visitor_token
    }
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    nprogress.done()
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

