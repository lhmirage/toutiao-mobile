
import axios from 'axios'
// 在非组件中获取store必须通过这种方式，单独加载和在组件中this.$store一个东西
import store from '@/store/'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',

  transformResponse: [function (data) {
    // 后端返回的数据可能不是JSON格式字符串
    // 如果不是的话，那么JSONbig.parse 调用就会报错//所以我们使用try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      // console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }
  }]
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
