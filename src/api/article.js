import request from '@/utils/request'

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 获取文章详情
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 收藏文章

export const addCollect = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/articles/collections',
    data: {
      target: articleId
    }
  })
}
// 取消收藏文章

export const deleteCollect = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/articles/collections/${articleId}`
  })
}

// 添加点赞
export const addLike = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/articles/likings',
    data: {
      target: articleId
    }
  })
}
// 取消点赞
export const deleteLike = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/articles/likings/${articleId}`
  })
}
