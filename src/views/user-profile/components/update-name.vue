<template>
  <div class="update-name">
    <van-nav-bar title="修改昵称"
                 left-text="取消"
                 @click-left="$emit('close')"
                 @click-right="onConfirm"
                 right-text="完成" />

    <div class="name-field-wrap">
      <van-field v-model="localName"
                 rows="2"
                 autosize
                 type="textarea"
                 maxlength="7"
                 placeholder="请输入昵称"
                 show-word-limit />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  data () {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: String,
      require: true
    },
    gender: {
      type: Number
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      try {
        // 请求提交更改更新用户昵称
        await updateUserProfile({
          name: this.localName
        })

        this.$toast.success('保存成功')
        // 发布input事件，更新父组件v-model中的数据
        this.$emit('input', this.localName)
        this.$emit('close')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.name-field-wrap {
  padding: 10px;
}
</style>
