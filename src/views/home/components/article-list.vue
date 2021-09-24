<template>
  <div class="article-list">
    <van-pull-refresh v-model="isPullDownLoading"
                      :success-text="refreshSuccessText"
                      :success-duration="1500"
                      @refresh="onRefresh">
      <van-list v-model=" loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <article-item v-for="(article, index) in articles"
                      :key="index"
                      :article="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [], // 数据列表
      loading: false, // 控制加载中的loading状态
      finished: false, // 当加载结束，不再触发加载更多
      timestamp: null,
      isPullDownLoading: false,
      refreshSuccessText: ''
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now(), // 相当于页码，请求数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
        with_top: 1 // 是否包含置顶,1包含置顶，0不包含置顶
      })

      const { results } = data.data
      this.articles.push(...results) // 合并数组
      this.loading = false
      // 判断是否后面还有数据
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },

    async onRefresh () {
      // 下拉刷新，组件自己会展示loading状态，请求获取数据，顶部追加，关闭刷新状态
      const { data } = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articles.unshift(...results)

      this.isPullDownLoading = false

      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
} // 设置完成之后不会使得被挡住“没有更多了”，固定定位
</style>
