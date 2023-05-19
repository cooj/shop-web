<template>
    <el-image v-bind="$attrs">
        <template #error>
            <div class="image-err">
                <i class="i-ep-picture" />
            </div>
        </template>
    </el-image>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.image-error {
  i {
    font-size: 36px;
  }
}
</style>
