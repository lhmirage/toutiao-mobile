<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar"
                 title="文章详情"
                 left-arrow
                 @click-left="$router.back()" />

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
                  round
                  size="small">{{ article.is_followed ? '已关注' : '关注'}}</van-button>

    </van-cell>
    <div class="markdown-body" v-html="article.content">
    </div>
  </div>
</template>

<script>
// 在组件中获取动态路由参数：
// 方式一: this.$route.params.xxx
// 方式二：props 传参，推荐 (this.articleId)
import './github-markdown.css'
import { getArticle } from '@/api/article'
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
    }
  },
  data () {
    return {
      article: {} // 文章数据对象
    }
  }

}
</script>

<style scoped lang="less">
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
