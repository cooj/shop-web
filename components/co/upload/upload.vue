<template>
    <div class="co-upload" :class="`limit${props.limit}`">
        <el-upload v-if="props.type === 'text'" v-model:file-list="defData.uploadList" class="co-upload-text"
            :class="{ 'co-upload-hide': defData.hideUpload }" action="/" list-type="text" :limit="props.limit"
            :on-change="onImgChange" :auto-upload="false" :accept="props.accept" :multiple="props.multiple">
            <!--  :on-preview="onImgPreview" :on-remove="onImgRemove" -->
            <el-button type="primary" link>
                上传
            </el-button>
            <template #file="{ file }">
                <el-button type="primary" link @click="onImgPreview(file)">
                    查看
                </el-button>
                <el-button v-if="!props.readonly" type="info" link @click="removeImg(file)">
                    删除
                </el-button>
            </template>
        </el-upload>
        <el-upload v-else v-model:file-list="defData.uploadList" :class="{ 'co-upload-hide': defData.hideUpload }"
            action="/" list-type="picture-card" :limit="props.limit" :on-change="onImgChange" :auto-upload="false"
            :accept="props.accept" :multiple="props.multiple">
            <i class="i-ep-plus block" />
            <template #file="{ file }">
                <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="onImgPreview(file)">
                            <i class="i-ep-zoom-in block" />
                        </span>
                        <span v-if="!props.readonly" class="el-upload-list__item-delete" @click="removeImg(file)">
                            <i class="i-ep-delete block" />
                        </span>
                    </span>
                </div>
            </template>
        </el-upload>

        <el-image-viewer v-if="showImg.viewer" :url-list="showImg.list" :z-index="10000" :initial-index="showImg.index"
            teleported @close="closeView" />
    </div>
</template>

<script lang="ts" setup>
import type { UploadFile, UploadFiles } from 'element-plus'
import { computed, reactive, watch } from 'vue'
import { CommonApi } from '@/api/common'

interface AllFileList {
    url: string // 服务器文件地址
    blob: string // 服务器文件地址或者是本地blob地址
}

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    limit: {
        type: Number,
        default: 1,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    accept: {
        type: String,
        default: 'image/*',
    },
    type: {
        type: String,
        default: 'picture-card',
    },
    readonly: {
        type: Boolean,
        default: false,
    },
})
const emits = defineEmits<{
    (e: 'update:modelValue', param: string): void
}>()

const defData = reactive({
    ready: false,
    hideUpload: false,
    allFile: [] as AllFileList[], // 所有图片数组
    uploadList: [] as { name: string; url: string }[], // 已上传的图片
    deleteList: [] as string[], // 暂存需要删除的图片
})

const showImg = reactive({
    viewer: false,
    index: 0,
    list: computed(() => defData.allFile.map(item => item.url)), // 预览图片数组
})

const initData = () => {
    let imgArr = props.modelValue.split(',')
    if (!props.modelValue) imgArr = []
    defData.allFile = imgArr.map(item => ({ url: item, blob: item }))
    defData.uploadList = imgArr.map(item => ({ name: item, url: item }))

    defData.hideUpload = defData.uploadList.length >= props.limit
}

// 数组转成字符串形式
const listToStr = (arr: any[], t = ',') => {
    let url = ''
    arr.forEach((item: string, index) => {
        const symbol = index ? t : ''
        url += symbol + item
    })
    return url
}

// 图片改变
const onImgChange = async (file: UploadFile, files: UploadFiles) => {
    if (files.length >= props.limit) defData.hideUpload = true

    const formData = new FormData()
    formData.append('image', file.raw as File)
    const { data: uploadInfo } = await CommonApi.upload(formData)

    if (uploadInfo.value?.code !== 200) return ElMessage.error(uploadInfo.value?.msg)

    defData.ready = true
    defData.allFile.push({
        url: uploadInfo.value?.data.src,
        blob: file.url as string,
    })
    defData.hideUpload = defData.uploadList.length >= props.limit

    emits('update:modelValue', listToStr(showImg.list))
}

// 文字类型，移除图片
const removeImg = (file: UploadFile) => {
    // 先找到删除数组列表图片中的那条数据
    const index = defData.allFile.map(item => item.blob).indexOf(file.url as string)
    if (index < 0) return

    // 先找到需要删除的那个地址
    const url = defData.allFile[index].url
    if (!defData.deleteList.includes(url)) defData.deleteList.push(url) // 暂存到删除列表中

    defData.allFile.splice(index, 1)
    defData.uploadList.splice(index, 1)

    defData.hideUpload = defData.uploadList.length >= props.limit

    emits('update:modelValue', listToStr(showImg.list))
}

// 图片删除
const onDeleteFile = async () => {
    if (!defData.deleteList.length) return
    // 删除已上传的图片
    // Promise.all([
    //   defData.deleteList.map(item => CommonApi.delImg({ src: item })),
    // ])
    defData.deleteList = []
}

// 图片预览
const onImgPreview = (file: UploadFile) => {
    // 先找到删除数组列表图片中的那条数据
    const index = defData.allFile.map(item => item.blob).indexOf(file.url as string)
    if (index < 0) return

    // 先找到需要删除的那个地址
    const url = defData.allFile[index].url
    const showIndex = showImg.list.indexOf(url as string)
    showImg.index = showIndex > -1 ? showIndex : 0
    showImg.viewer = true
}
// 关闭图片预览
const closeView = () => {
    showImg.viewer = false
}

// 首次加载只调用一次，例如修改，组件以加载，props传过来的值慢一点时
watch(() => props.modelValue, (newVal, oldVal) => {
    if (defData.ready) return
    if (newVal && !oldVal) {
        initData()
        defData.ready = true
    }
})

// onMounted(() => {
//     initData()
// })

defineExpose({
    onDeleteFile,
})
</script>

<style lang="scss" scoped>
.co-upload-hide {
    :deep() {
        .el-upload {
            display: none;
        }
    }
}

.co-upload {
    &.limit1 {
        :deep(.el-upload-list--picture-card) {

            display: block;

            .el-upload-list__item {
                margin: 0;
                display: flex;
            }
        }
    }

    :deep() {

        .el-upload--picture-card {
            --el-upload-picture-card-size: 100px;
        }

        .el-upload-list--picture-card {
            --el-upload-list-picture-card-size: 100px;
        }

        .el-icon--close-tip {
            display: none !important;
        }

        .el-upload-list__item.is-success:focus .el-upload-list__item-status-label,
        .el-upload-list__item.is-success:hover .el-upload-list__item-status-label {
            display: inline-flex;
            opacity: 1;
        }

        .co-upload-text {

            .el-upload-list--text {
                margin: 0;

                .el-upload-list__item {
                    margin: 0;
                }
            }

        }

    }
}
</style>
