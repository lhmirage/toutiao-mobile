import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user' // 定义常量，防止双向读取错误（字符串不会检测）

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) // 当前登录用户的登录状态(token等)
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 本地存储实现持久化
      setItem(USER_KEY, state.user) // 对象需要先转为字符串才能本地存储
    }
  },
  actions: {
  },
  modules: {
  }
})
