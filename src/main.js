import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

// 加载vant组件库样式
import 'vant/lib/index.css'

// 自动设置REM基准值
import 'amfe-flexible'
// 全局样式放最后覆盖第三方
import './styles/index.less'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
