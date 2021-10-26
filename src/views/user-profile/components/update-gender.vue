<template>
  <div class="update-gender">
    <van-picker show-toolbar
                :columns="columns"
                :default-index="defaultIndex"
                @cancel="$emit('close')"
                @change="onGenderChange"
                @confirm="onconfirm" />

  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    },
    async onconfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      // 请求提交更改更新用户性别
      await updateUserProfile({
        gender: this.defaultIndex
      })

      // 发布input事件，更新父组件v-model中的数据
      this.$emit('input', this.defaultIndex)
      this.$emit('close')

      this.$toast.success('保存成功')
    }
  },
  props: {
    value: {
      type: Number,
      require: true
    }
  }
}
</script>

<style>
</style>
