<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-72px mt50px>
      <div i-carbon-warning inline-block />
    </div>
    <div class="text-72px lh-1em -mt20px mb30px">
      404
    </div>
    <div>
      <p>对不起，您访问的页面没找到</p>
      <p>您可以检查刚才的输入，或者去其他地方逛逛</p>
    </div>
    <div>
      <NuxtLink to="/">
        <button btn text-sm m="3 t8">
          首页
        </button>
      </NuxtLink>
      <button btn text-sm m="3 t8" @click="router.back()">
        返回上一页
      </button>
    </div>
  </main>
</template>
