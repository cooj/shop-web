<template>
    <div>
    <!-- 我的订单 -->
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'user',
    middleware: 'auth',
    redirect: {
        path: '/order/list',
    },
})
</script>

<style  lang="scss" scoped>

</style>
