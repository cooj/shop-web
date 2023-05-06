<script lang="ts" setup>

</script>

<template>
  <el-image v-bind="$attrs">
    <template #error>
      <div class="image-err">
        <i class="i-ep-picture" />
      </div>
    </template>
  </el-image>
</template>

<style lang="scss" scoped>
.image-error {
  i {
    font-size: 36px;
  }
}
</style>
