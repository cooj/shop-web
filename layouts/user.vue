<template>
  <BaseTop />
  <BaseHeader />
  <div class="container">
    <el-container>
      <el-aside style="margin-top: 20px;margin-right:10px;width: 230px;background-color: white;">
        <UserAside />
      </el-aside>
      <el-main style="background-color: white;margin-top: 20px">
        <slot />
      </el-main>
    </el-container>
  </div>
  <div class=" mx-auto text-center opacity-25 text-sm">
    [Home Layout]
  </div>
  <BaseFooter />
</template>

<script lang="ts" setup>
import BaseHeader from './components/BaseHeader.vue'

import BaseFooter from './components/BaseFooter.vue'
import BaseTop from '~/layouts/components/BaseTop.vue'
import UserAside from '~/layouts/components/UserAside.vue'
</script>
