import axios from 'axios'
/* 导入进度条插件js、css */
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

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
    config.headers.Authorization = window.sessionStorage.getItem("token")
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
