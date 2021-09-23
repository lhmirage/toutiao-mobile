
import axios from 'axios'
// 在非组件中获取store必须通过这种方式，单独加载和在组件中this.$store一个东西
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

request.interceptors.request.use(function (config) {
  const { user } = store.state

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`// 拦截器统一设置用户token
  }
  // 返回config,否则请求发不出去
  return config
}, function (error) {
  return Promise.reject(error)
})

export default request

// 请求拦截器
