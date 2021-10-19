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
    <search-history v-else :search-histories="searchHistories" @search="onSearch" @update-histories="searchHistories = $event "/>

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
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

      // 如果用户登录，则把搜索记录存到线上
      // 调用获取搜索结果的数据接口
      // setItem('search-histories', this.searchHistories)

      // 展示搜索结果
      this.isResultShow = true
    },

    async loadSearchHistories () {
      const searchHistories = getItem('search-histories') || []
      // let searchHistories = getItem('search-histories') || []
      // if (this.user) {
      //   const { data } = await getSearchHistories()

      //   // 合并数组:[...数组,...数组]
      //   // 把Set转为数组:[ ...Set对象]
      //   // 数组去重:[ ...new Set([...数组,...数组])

      //   searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]
      // }

      this.searchHistories = searchHistories
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
  },
  created () {
    this.loadSearchHistories()
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    // 监视搜索历史记录变化，存储到本地
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  }
}
</script>

<style scoped lang="less">
</style>
