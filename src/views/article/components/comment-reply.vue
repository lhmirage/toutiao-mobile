<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left"
                @click="$emit('close')"
                name="cross" />
    </van-nav-bar>

    <!-- 当前评论项 -->
    <comment-item :comment="comment" />

    <!-- 所有评论回复 -->
    <van-cell title="所有回复" />
    <comment-list :source="comment.com_id"
                  type="c" />

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn"
                  type="default"
                  @click="isPostShow = true"
                  round
                  size="small">写评论</van-button>
    </div>

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow"
               position="bottom">
      <post-comment :target="comment.com_id" :article-id="articleId" @post-success="onPostSuccess"/>
      </van-popup>

  </div>
</template>

<script>
import commentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment.vue'
export default {
  components: { commentItem, CommentList, PostComment },
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      require: true
    },
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
      isPostShow: false,
      CommentList: [] // 评论的回复列表
    }
  },
  methods: {
    onPostSuccess (comment) {
      // 将发布成功的评论置顶
      this.CommentList.unshift(comment)

      // 更新评论的回复数量
      this.comment.reply_count++

      // 关闭发布回复的弹出层
      this.isPostShow = false
    }
  }

}
</script>

<style scoped lang="less">
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 200px;
    height: 30px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
}
</style>
