.<template>
  <div class="channel-edit">
    <van-cell center
              :border="false">
      <div slot="title"
           class="channel-title">我的频道</div>
      <van-button @click="isEdit = !isEdit"
                  type="danger"
                  plain
                  round
                  size="mini">{{ isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="grid-item"
                     :icon="(isEdit && index !== 0)? 'clear' : ''"
                     v-for="(channel, index) in userChannels"
                     :key="index"
                     text="channel.name"
                     @click="onUserChannelClick(index)" />
    </van-grid>

    <van-cell center
              :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="(channel, index) in recommandChannels"
                     :key="index"
                     :text="channel.name"
                     @click="onAdd(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false // 控制编辑的显示状态
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },

    onAdd (channel) {
      this.userChannels.push(channel)// 计算属性会依赖用到的属性的变化而变化

      // 频道数据持久化
    },

    onUserChannelClick (index) {
      if (this.isEdit && index !== 0) {
      // 编辑状态，删除频道
        this.deleteChannel(index)
      } else {
      // 非编辑状态，切换频道
        this.switchChannel(index)
      }
    },

    deleteChannel (index) {
      this.userChannels.splice(index, 1)

      // 数据持久化
    },

    switchChannel (index) {
      // 关闭弹出层
      this.$emit('close')
    }
  },
  computed: {
    // 推荐的频道列表
    recommandChannels () {
      // 思路：所有频道-我的频道=剩下频道
      // filter，根据方法返回的布尔值ture来收集数据,查找满足条件的所有元素
      return this.allChannels.filter(channel => {
        // 判断channel是否属于用户频道
        // find 方法查找满足条件的单个元素
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  }

}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;

  .channel-title {
    font-size: 16px;
    color: #333333;
  }

  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }

    /deep/ .van-grid-item_ icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
}
</style>
