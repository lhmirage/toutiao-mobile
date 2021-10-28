<template>
  <div class="update-photo">
    <img :src="image"
         ref="image"
         class="image">
    <van-nav-bar left-text="取消"
                 class="toolbar"
                 right-text="确认"
                 @click-left="$emit('close')"
                 @click-right="onConfirm" />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      // type: Object,
      require: true
    }
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true,
        duration: 0 // 展示时间0表示持续展示
      })

      const file = await this.getCroppedCanvas()

      // 如果要求Content-Type 是 multipart/form-data，则一定要提交FormData数据对象，专门用于文件上传的,不能提交{},没用
      const fd = new FormData()
      fd.append('photo', file)
      await updateUserPhoto(fd)

      // 更新父组件中的用户头像
      this.$emit('update-photo', window.URL.createObjectURL(file))

      // 关闭弹出层
      this.$emit('close')

      this.$toast.success('保存成功')
    }
  },
  data () {
    return {
      image: {
        image: window.URL.createObjectURL(this.file),
        cropper: null
      }
    }
  },
  mounted () {
    const image = this.$refs.image

    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move ',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>

<style scoped lang="less">
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}
.image {
  display: block;
  max-width: 100%;
}
</style>
