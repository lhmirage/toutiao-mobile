<template>
  <div class="update-photo">
    <img :src="image">
  </div>
</template>

<script>
export default {
  name: 'UpdatePhoto',
  props: {
    image: {
      type: String,
      require: true
    }
  }
}
</script>

<style>

</style>
