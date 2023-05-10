<script lang="ts" setup>
import BaseFooter from './components/BaseFooter.vue'
import BaseHeader from './components/BaseHeader.vue'

// import BaseMenu from './components/BaseMenu.vue'
import BaseTop from './components/BaseTop.vue'
import BaseRight from './components/BaseRight.vue'
</script>

<template>
  <main>
    <ClientOnly>
      <BaseTop />
    </ClientOnly>
    <BaseHeader />
    <!-- <BaseMenu /> -->
    <slot />

    <div class="mx-auto h0 text-right text-sm opacity-25">
      [Home Layout]
    </div>
    <BaseFooter />
    <BaseRight />
  </main>
</template>
