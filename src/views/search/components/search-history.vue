<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">

<!-- prop数据如果是引用类型（数组、对象）可以修改,注意这个修改指的是:user.name =
' Jack '、 arr.push(123)、 arr.splice(0，1)
但是任何 prop数据都不能重新赋值:XXX = XXX -->

        <span @click="$emit('update-histories', [])">全部删除</span>&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete"
                v-else
                @click="isDeleteShow = true" />
      <!-- <van-icon name="delete"/>-->
    </van-cell>
    <van-cell :title="history"
              v-for="(history, index) in searchHistories"
              :key="index"
              @click="onDelete(history, index) ">
      <van-icon name="close"
                v-show="isDeleteShow" />
    </van-cell>

  </div>
</template>

<script>
// import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onDelete (history, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
        // 持久化处理

        // setItem('search-histories', this.searchHistories)

        return
      }

      // 非删除状态，展示结果
      this.$emit('search', history)
    }
  }
}
</script>

<style scoped lang="less">
</style>
