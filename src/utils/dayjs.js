// 初始化dayjs相关配置
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间
dayjs.extend(relativeTime)

// 配置中文语言包
dayjs.locale('zh-cn')

// 把处理相对时间的代码包装为全局过滤器,也就是一个可调用的方法
// 在组件的模板中使用过滤器:{{ xxxrelativeTime }}
// 管道符前面的内容会作为参数传递给过滤器函数
// 过滤器的返回值会渲染到使用过滤器的模板中
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
