<script lang="ts" setup>
import LoginFooter from './components/LoginFooter.vue'
import LoginHeader from './components/LoginHeader.vue'
</script>

<template>
  <main>
    <LoginHeader />
    <slot />
    <LoginFooter />
  </main>
</template>
