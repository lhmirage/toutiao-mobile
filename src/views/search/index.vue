<template>
  <div class="search-container">

    <!-- 搜索栏 -->
    <form action="/">
      <van-search v-model="searchText"
                  placeholder="请输入搜索关键词"
                  show-action
                  @search="onSearch"
                  @cancel="$router.back()"
                  @focus="isResultShow = false"
                />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" />

    <!-- 历史记录 -->
    <search-history v-else />

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion'
export default {
  name: 'SearchIndex',
  methods: {
    onSearch () {
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
      isResultShow: false // 控制搜索结果的显示状态
    }
  }
}
</script>

<style scoped lang="less">
</style>
