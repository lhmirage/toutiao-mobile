import request from '@/utils/request'

export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchResults = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

// 获取用户搜索历史
export const getSearchHistories = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
