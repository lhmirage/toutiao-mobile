import request from '@/utils/request'

// 登陆注册
export const getAllChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}

export const addUserChannel = data => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data
  })
}

export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
