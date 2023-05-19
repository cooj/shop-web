<template>
    <div class="index-box">
        <Suspense>
            <HomeMain />
            <!-- <ClientOnly>
        </ClientOnly> -->
            <template #fallback>
                <div italic op50>
                    <span animate-pulse>Loading...</span>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
const online = useOnline()
const name = ref('张三')

definePageMeta({
    layout: 'home',
})
</script>

<style  lang="scss" scoped>
.index-box {
  padding-top: 40px;
  background-color: #f3f3f3;
}
</style>
