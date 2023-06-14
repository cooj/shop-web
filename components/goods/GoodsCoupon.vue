<template>
    <div class="coupon-pane">
        <slot />
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.coupon-pane {
    position: relative;
    overflow: hidden;
    padding: 0 7px;
    font-size: 12px;
    line-height: 18px;
    display: inline-block;
    // margin-right: 5px;
    color: var(--el-color-primary);
    border-top: 1px solid var(--el-color-primary);
    border-bottom: 1px solid var(--el-color-primary);
    transform: scale(0.9);
    transform-origin: left;

    &::after,
    &::before {
        content: '';
        --co-wavy-width: 3px;
        width: 100%;
        height: var(--co-wavy-width);
        background: linear-gradient(135deg, transparent, transparent 45%, var(--el-color-primary), transparent 55%),
            linear-gradient(45deg, transparent, transparent 45%, var(--el-color-primary), transparent 55%);
        background-size: calc(var(--co-wavy-width) * 2) calc(var(--co-wavy-width) * 2);
        background-repeat: repeat-x, repeat-x;
        transform: rotateZ(90deg);
        transform-origin: left;
    }

    &::before {
        position: absolute;
        top: -4px;
        left: 2px;
    }

    &::after {
        position: absolute;
        bottom: -1px;
        right: 2px;
        transform-origin: right;
    }
}
</style>
