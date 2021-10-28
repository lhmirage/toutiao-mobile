<template>
  <div class="user-profile">
    <van-nav-bar class="app-nav-bar"
                 title="个人信息"
                 left-arrow
                 @click-left="$router.back()" />
    <!--/导航栏-->
    <input type="file"
           hidden
           accept="image/*"
           ref="file"
           @change="onFileChange">

    <van-cell title="头像"
              is-link
              @click="$refs.file.click()"
              center>
      <van-image width="30"
                 height="30"
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
              @click="isEditGenderShow = true"
              :value="user.gender === 0 ? '男' : '女'"></van-cell>
    <van-cell title="生日"
              is-link
              @click="isEditBirthdayShow = true"
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

    <!-- 修改性别 -->
    <van-popup -model="isEditGenderShow"
               position="bottom">
      <update-gender v-model="user.gender"
                     @close="isEditGenderShow = false" />
    </van-popup>

    <!-- 修改生日 -->
    <van-popup -model="isEditBirthdayShow"
               position="bottom">
      <update-birthday v-if="isEditBirthdayShow"
                       v-model="user.birthday"
                       @close="isEditBirthdayShow = false" />
    </van-popup>

    <!-- 修改用户头像 -->
    <van-popup v-model="isEditPhotoShow"
               class="update-photo-popup"
               position="bottom"
               style="height: 100%">
      <update-photo :file="previewImage"
                    v-if="isEditPhotoShow"
                    @close="isEditPhotoShow = false"
                    @update-photo="user.photo = $event" />

    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  components: { updateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  name: 'UserProfile',
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      const { data } = getUserProfile()
      this.user = data.data
    },
    onFileChange () {
      // 展示弹出层
      this.isEditPhotoShow = true
      // 在弹出层中预览图片
      const file = this.$refs.file.files[0]

      this.previewImage = file
      // 为了解决相同文件不触发change
      this.$refs.file.value = ''
    }
  },
  data () {
    return {
      user: {},
      isEditNameShow: false, // 编辑昵称的选择按键
      isEditGenderShow: false, // 编辑性别的显示状态
      isEditBirthdayShow: false,
      isEditPhotoShow: false, // 编辑头像的显示状态
      previewImage: null // 上传预览图片
    }
  }

}
</script>

<style scoped lang="less">
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background-color: #000;
}
</style>
