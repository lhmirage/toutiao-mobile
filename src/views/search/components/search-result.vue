<template>
  <div class="search-result">
    <van-list -model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="(item, index) in list"
                :key="index"
                :title="article.title" />
    </van-list>

  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout仅做示例，真实场景中一般为ajax请求
      // 1.请求获取数据
      const { data } = await getSearchResults({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })
      // 2.将数据放到数据列表中
      const { results } = data.data
      this.list.push(...results)
      // 3.关闭本次的loading
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        // 如果有，则继续渲染
        this.page++
      } else {
        // 没有的话就结束加载
        this.finished = true
      }
    }
  },
  props: {
    searchText: {
      type: String,
      require: true
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
