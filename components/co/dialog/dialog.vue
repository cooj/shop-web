<template>
    <!-- <div v-if="CLIENT"> -->
    <lazy-client-only>
        <el-dialog v-model="visible" class="co-dialog" :fullscreen="defData.fullscreen" draggable v-bind="$attrs"
            @close="onClose">
            <template #header>
                <span class="el-dialog__title">
                    {{ props.title }}
                </span>
                <button v-if="!props.hidden" class="dialog-full el-dialog__headerbtn" @click="onToggle">
                    <i v-if="defData.fullscreen" class="el-dialog__close active i-ep-copy-document" />
                    <i v-else class="el-dialog__close i-ep-full-screen" />
                </button>
            </template>
            <div :class="{ 'auto-height': props.autoHeight }" class="dialog-body-box">
                <slot />
            </div>
            <template v-if="!props.noFooter" #footer>
                <el-button @click="onCancel">
                    取 消
                </el-button>
                <el-button type="primary" :loading="props.loading" @click="onConfirm">
                    确 定
                </el-button>
            </template>
        </el-dialog>
    </lazy-client-only>
    <!-- </div> -->
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'

const props = defineProps({
    visible: { // 弹窗显示
        type: Boolean,
        default: false,
    },
    title: { // 弹窗标题
        type: String,
        default: '',
    },
    loading: { // 确定按钮loading
        type: Boolean,
        default: false,
    },
    noFooter: { // 是否显示底部按钮
        type: Boolean,
        default: false,
    },
    autoHeight: { // 弹窗body内容高度自适应,
        type: Boolean,
        default: false,
    },
    hidden: { // 是否显示最大化、最小化按钮
        type: Boolean,
        default: false,
    },
})
const emits = defineEmits([
    // 'update:modelValue',
    'update:visible',
    'cancel',
    'close',
    'confirm',
])

const defData = reactive({
    visible: props.visible,
    fullscreen: false,
})

// 子组件定义自己的visible
const visible = computed({
    get: () => props.visible,
    set: (value) => {
        emits('update:visible', value)
    },
})

const onToggle = () => {
    defData.fullscreen = !defData.fullscreen
    // emits('update:fullscreen', defData.fullscreen)
}

// 关闭弹窗
const onClose = () => {
    emits('close')
    visible.value = false
}

// 点击取消
const onCancel = () => {
    emits('cancel')
    visible.value = false
}

// 点击确定
const onConfirm = () => {
    emits('confirm')
    // visible.value = false
}
</script>

<style lang="scss" scoped>
.dialog-body-box {
    display: flex;
    flex-direction: column;
    height: calc(70vh - 150px);

    &.auto-height {
        height: auto;
    }

    :deep(>.dialog-flex) {
        flex: 1;
        overflow: auto;
    }
}

.dialog-full {
    margin-right: 54px;

    // display: flex;
    // align-items: center;
    // justify-content: center;
    .el-dialog__close {
        display: block;
        margin: 0 auto;
        width: 1em;
        height: 1em;
        margin-top: -3px;
    }

    .dialog-full-close {
        transform: rotate(180deg);
    }

}
</style>
