<template>
  <div class="update-birthday">
    <van-datetime-picker v-model="currentDate"
                         type="date"
                         title="选择年月目"
                         :min-date="minDate"
                         :max-date="maxDate"
                         @cancel="$emit('close')"
                         @confirm="onConfirm" />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  props: {
    value: {
      type: String,
      require: true
    }
  },
  methods: {
    async onconfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })

      // const data = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth()}-${this.currentDate.getDate()}`
      // 请求提交更改更新用户性别
      await updateUserProfile({
        birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
      })

      // 发布input事件，更新父组件v-model中的数据
      this.$emit('input', this.currentDate)
      this.$emit('close')

      this.$toast.success('保存成功')
    }
  }
}
</script>

<style>
</style>
