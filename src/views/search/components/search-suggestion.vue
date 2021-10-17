<template>
  <div class="search-suggestion">
    <van-cell icon="search"
              :title="str"
              v-for="(str, index) in suggestions"
              :key="index"
            ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想默认数据数组
    }
  },
  watch: {
    // 属性名：要监视的数据的名称
    searchText: {
      async handler () {
        // 找到数据接口，请求获取数据，模板绑定展示
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      },
      immediate: true
      // 该回调将会在监听开始之后被立即调用
    }
  }
}
</script>

<style scoped lang="less">
</style>
