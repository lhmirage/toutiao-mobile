<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list -model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <comment-item v-for="(comment, index) in list"
                    :key="index"
                    :comment="comment"
                    @reply-click="$emit('reply-click', $event)"
                  />
    </van-list>

  </div>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  props: {
    // 如果获取文章评论,则传递文章ID
    // 如果获取评论回复,则传递评论Id
    source: {
      type: [Number, String, Object],
      require: true
    },
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      // 数组或者对象的默认值必须通过函数返回
      // default: []
      default: () => []
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的页码
      limit: 10 // 每页大小
    }
  },
  methods: {
    async onLoad () {
      // 1请求获取数据
      const { data } = await getComments({
        type: this.type,
        source: this.source.toString(), // 文章id或者评论id
        offset: this.offset, // 不传默认从第一页读数据
        limit: this.limit
      })
      this.$emit('update-total-count', data.data.total_count)

      // 2把数据放到列表
      const { results } = data.data
      this.list.push(...results)
      // 3将本次loading关闭
      this.loading = false
      // 4判断是否还有数据
      if (results.length) {
        // 如果有,更新获取下一页数据的页码
        this.offset = data.data.last_id
      } else {
        // 如果没有，则将 finished 设置为ture，不再触发加载更多了
        this.finished = true
      }
    }
  },
  components: {
    CommentItem
  }

}
</script>

<style>
</style>
