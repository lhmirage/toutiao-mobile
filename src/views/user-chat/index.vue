<template>
  <div class="user-chat">
    <van-nav-bar class="van-nav-bar"
                 title="小智同学"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 消息列表 -->
    <van-cell-group class="message-list"
                    ref="message-list">
      <van-cell :title="item.msg"
                v-for=" ( item,index) in messages"
                :key="index" />

    </van-cell-group>
    <!-- 发送消息 -->
    <van-cell-group class="send-message-wrap">
      <van-field v-model="message"
                 :border="false"
                 placeholder="请输入消息" />
      <van-button type="primary"
                  @click="onSend"
                  size="small">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null,
      messages: [] || getItem('chat-messages')
    }
  },
  created () {
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket

    socket.on('connect', () => {
      console.log('链接成功')
    })

    socket.on('disconnect', () => {
      console.log('断开链接')
    })

    socket.on('message', data => {
      this.messages.push(data)
    })
  },
  methods: {
    onSend () {
      // 请求发送信息
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)

      // 把用户发送的消息存储到数组中
      this.messages.push(data)

      this.message = ''
    },
    scrollToBottom () {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  },
  watch: {
    messages () {
      setItem('chat-messages', this.messages)
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  mounted () {
    this.scrollToBottom()
  }
}
</script>

<style scoped lang="less">
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}

.send-message-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 14px;
  align-items: center;
}
</style>
