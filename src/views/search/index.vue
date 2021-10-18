<template>
  <div class="search-container">

    <!-- 搜索栏 -->
    <form action="/">
      <van-search v-model="searchText"
                  placeholder="请输入搜索关键词"
                  show-action
                  @search="onSearch(searchText)"
                  @cancel="$router.back()"
                  @focus="isResultShow = false"
                />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" @search="onSearch" />

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" />

    <!-- 历史记录 -->
    <search-history v-else :search-histories="searchHistories" />

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion'
export default {
  name: 'SearchIndex',
  methods: {
    onSearch (searchText) {
      // 把输入框设置为要搜索的文本
      this.searchText = searchText

      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项删掉
        this.searchHistories.splice(index, 1)
      }

      // 把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchText)

      // 展示搜索结果
      this.isResultShow = true
    }
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的显示状态
      searchHistories: []
    }
  }
}
</script>

<style scoped lang="less">
</style>
