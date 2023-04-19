<template>
  <div>
    我的订单
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'user',
  middleware: 'auth',
})
</script>

<style  lang="scss" scoped>
p{
  display: block;
}
</style>
