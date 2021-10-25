<template>
  <div class="user-profile">
    <van-nav-bar class="app-nav-bar"
                 title="个人信息"
                 left-arrow
                 @click-left="$router.back()" />
    <!--/导航栏-->
    <van-cell title="头像"
              is-link
              center>
      <van-image width="30"
                 height="30"
                 I
                 round
                 fit="cover"
                 :src="user.photo" />
    </van-cell>
    <van-cell title="昵称"
              is-link
              @click="isEditNameShow = true"
              :value="user.name">
    </van-cell>
    <van-cell title="性别"
              is-link
              :value="user.gender === 0 ? '男' : '女'"></van-cell>
    <van-cell title="生日"
              is-link
              :value="user.birthday"></van-cell>
    <van-popup -model="isEditNameShow"
               position="bottom"
               :style="{ height: '100%' }">
      <!-- 当你传递给子组件的数据既要使用又要修改,这种情况下可以使用v-model简写 -->
      <!-- v-model="user.name" -->
      <!-- :value="user.name" 默认名字叫value -->
      <!-- 默认监听input事件 @input="user.name = $event" -->
      <!-- v-model的本质还是父子组件通信，仅仅是简化了父组件的使用 -->

      <!-- v-model 只能使用一次 -->
      <!-- 如果有多个数据需要保持同步,使用.sync修饰符 -->
      <!-- :gender.sync="user.gender"
      :gender="user.gender"
      @update:gender="user.gender = $event"
      @update:属性名称="user.gender = $event"
      -->
      <update-name v-if="isEditNameShow"
                   @close="isEditNameShow = false"
                   v-model="user.name" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name'
export default {
  components: { updateName },
  name: 'UserProfile',
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      const { data } = getUserProfile()
      this.user = data.data
    }
  },
  data () {
    return {
      user: {},
      isEditNameShow: false // 编辑昵称的选择按键
    }
  }

}
</script>

<style scoped lang="less">
.van-popup {
  background-color: #f5f7f9;
}
</style>
