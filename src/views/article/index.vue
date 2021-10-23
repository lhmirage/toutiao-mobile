<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar"
                 title="文章详情"
                 left-arrow
                 @click-left="$router.back()" />

    <div class="article-wrap">
      <h1 class="title">{{ article.title }}</h1>
      <van-cell center
                class="user-info">
        <div slot="title"
             class="name">{{ article.aut_name }}</div>
        <van-image slot="icon"
                   round
                   fit="cover"
                   :src="article.aut_photo" />
        <div slot="label"
             class="pubdate">{{ article.pubdate | relativeTime }}</div>
        <van-button class="follow-btn"
                    :type="article.is_followed ? 'default' :'info'"
                    :icon="article.is_followed ? '' :'plus'"
                    @click="onFollow"
                    :loading="isFollowLoading"
                    round
                    size="small">{{ article.is_followed ? '已关注' : '关注'}}</van-button>

      </van-cell>
      <div class="markdown-body"
           v-html="article.content"
           ref="article-content">
      </div>
      <!-- 文章评论列表 -->
      <comment-list :source="articleId" :list="commentList" />
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn"
                  type="default"
                  @click="isPostShow = true"
                  round
                  size="small">写评论</van-button>
      <van-icon name="comment-o"
                :info="totalCommentCount"
                color="#777" />
      <van-icon :color="article.is_collected ? 'orange' : '#777'"
                @click="onCollect"
                :name="article.is_collected ? 'star' : 'star-o'" />
      <van-icon :color="article.attitude === 1 ? 'hotpink' : '#777'"
                @click="onLike"
                :name="article.attitude === 1 ? 'good-job' : 'good-job-o'" />
      <van-icon name="share"
                color="#777777"></van-icon>
    </div>
    <!-- 底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow"
               position="bottom">
        <post-comment :target="articleId" @post-success="onPostSuccess" @update-total-count="totalCommentCount = $event" />
    </van-popup>

    <!-- 发布评论 -->
  </div>
</template>

<script>
// 在组件中获取动态路由参数：
// 方式一: this.$route.params.xxx
// 方式二：props 传参，推荐 (this.articleId)
import './github-markdown.css'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import { getArticle, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment'

export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      require: true
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticle(this.articleId)
      this.article = data.data

      // 数据改变影响视图更新（DOM数据）不是立即的，如果需要在修改数据之后马上操作被该数据影响的视图DOM，需要把代码放在$nextTick中
      this.$$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    handlePerviewImage () {
      // 获取文章内容 DOM容器
      const articleContent = this.$refs['article-content']

      // 得到所有的img标签
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = [] // 搜集所有的图片路径

      // 循环img 列表，给img注册点击事件
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          // 在事件处理函数中调用ImagePreview()预览
          ImagePreview({
            images: imgPaths, // 预览图片路径
            startPosition: index // 起始位置
          })
        }
      })
    },
    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
        // 已关注，取消关注
      } else {
        await addFollow(this.article.aut_id)
        // 没有关注，添加关注
      }
      this.article.is_followed = !this.article.is_followed

      this.isFollowLoading = false
    },
    async onCollect () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.is_collected) {
        // 已收藏，取消收藏
        await deleteCollect(this.articleId)
      } else {
        await addCollect(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected

      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.attitude === 1) {
        // 已收藏，取消收藏
        await deleteLike(this.articleId)
        this.article.attitude = -1
      } else {
        await addLike(this.articleId)
        this.article.attitude = 1
      }

      this.$toast.success(`${this.article.is_collected ? '' : '取消'}点赞成功`)
    },

    onPostSuccess (comment) {
      // 把发布成功的评论数据对象放到列表顶部
      this.commentList.unshift(comment)

      // 更新评论的总数量
      this.totalCommentCount++
      // 关闭发布评论弹出层
      this.isPostShow = false
    }
  },
  data () {
    return {
      article: {}, // 文章数据对象
      isFollowLoading: false, // 关注用户按钮的loading状态
      isCollectLoading: false, // 收藏的loading状态
      isPostShow: false,
      commentList: [], // 文章评论数据
      totalCommentCount: 0 // 评论总数量
    }
  },
  components: {
    CommentList,
    PostComment
  }
}
</script>

<style scoped lang="less">
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}

.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}
.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}

ul {
  list-style: unset;
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
</style>
