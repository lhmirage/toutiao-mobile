<template>
  <div class="post-comment">
    <van-field v-model.trim="message"
               rows="2"
               autosize
               type="textarea"
               maxlength="50"
               placeholder="请输入留言"
               show-word-limit />
    <van-button size="mini" @click="onPost" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'PostComment',
  data () {
    return {
      message: '' // 输入框的内容
    }
  },
  methods: {
    async onPost () {
      const { data } = await addComment({
        target: this.target.toString(), // 评论的目标ID
        content: this.message, // 评论的内容
        art_id: this.articleId === null ? null : this.articleId.toString() // 文章的id
      })

      this.$emit('post-success', data.data.new_obj)

      this.$toast.success('发布成功')

      // 清空评论区
      this.message = ''
    }
  },
  props: {
    // 如果是发布文章评论，则传递文章ID
    // 如果是发布评论回复，则传递评论ID
    target: {
      type: [Number, String, Object],
      require: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  }

}
</script>

<style scoped lang="less">
.post-comment {
  padding: 14px;
  display: flex;
  align-items: center;
}
</style>
