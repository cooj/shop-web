<template>
    <el-image class="co-image" v-bind="$attrs">
        <template #error>
            <div class="image-err co-image-error">
                <i class="i-ep-picture" />
            </div>
        </template>
    </el-image>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.co-image {
    &-error {
        i {
            // font-size: 36px;
            font-size: var(--co-image-error-size, 36px);
        }
    }
}
</style>
