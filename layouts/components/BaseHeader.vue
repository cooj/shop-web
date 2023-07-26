<template>
    <section class="header-box">
        <el-form class="overflow-hidden py25px" size="large" @submit.prevent="onSearch">
            <div class="flex items-center justify-between text-#f8f8f8 container">
                <div class="logo min-w150px">
                    <NuxtLink to="/">
                        <img class="h50px" :src="systemInfo?.shop_logo" alt="">
                    </NuxtLink>
                </div>
                <div class="search-box relative w50%">
                    <el-autocomplete v-model="search.keyword" :fetch-suggestions="querySearchAsync"
                        popper-class="pop-search" class="w100%" :debounce="800" fit-input-width placeholder=""
                        select-when-unmatched @select="onSearch">
                        <template #prefix>
                            <i class="i-ep-search" />
                        </template>
                        <!-- <template #prepend>
                            <lazy-el-select v-model="search.select" placeholder="" style="width: 115px">
                                <el-option label="全部商品" value="1" />
                                <el-option label="精选商品" value="2" />
                                <el-option label="特价商品" value="3" />
                            </lazy-el-select>
                        </template> -->
                        <template #append>
                            <el-button type="primary" class="btn-search min-w120px" @click="onSearch">
                                搜 索
                            </el-button>
                        </template>
                        <template #default="{ item }">
                            <div class="pop-item flex justify-between">
                                <div class="pop-text text-13px">
                                    {{ item.value }}
                                </div>
                                <el-button v-if="item.history" size="small" link @click.stop="onRemoveHistory(item.value)">
                                    <span class="v1">搜索历史</span>
                                    <span class="color-primary">删除</span>
                                </el-button>
                            </div>
                        </template>
                    </el-autocomplete>
                    <div v-if="searchHot.length" class="search-hot">
                        热门搜索：<span v-for="(item) in searchHot" :key="item" @click="onSearchHot(item)">{{ item }}</span>
                    </div>
                </div>
                <div class="cart">
                    <NuxtLink to="/order/cart">
                        <el-badge :value="number" class="cart-number">
                            <el-button type="primary" class="min-w150px">
                                <i class="i-ep-shopping-cart-full mr8px" />
                                购物车
                            </el-button>
                        </el-badge>
                    </NuxtLink>
                </div>
            </div>
        </el-form>

        <HeaderIndex />
    </section>
</template>

<script lang="ts" setup>
import HeaderIndex from './header/HeaderIndex.vue'
import { GoodsApi } from '~/api/goods/list'

const useCartNumber = useCartNumberState()
const number = await useCartNumber.setCartNumber()

const route = useRoute()

const search = reactive({
    keyword: '',
    select: '1',
})

const useSystem = useSystemState()
const systemInfo = ref(useSystem.system)

const searchDataList = useLocalStorage<string[]>('searchKeywordList', [])

const searchHot = computed(() => {
    const text = systemInfo.value?.hot ?? ''
    return text.split(',')
})

// 搜索
const onSearch = () => {
    const queryStr = search.keyword?.trim() ?? ''
    if (!queryStr) return ElMessage.error('请输入商品关键词')
    // 记录搜索历史,追加到第一项
    const index = searchDataList.value.findIndex(item => item === queryStr)
    if (index >= 0) {
        searchDataList.value = moveArraySite(searchDataList.value, index, 0) // 移动到第一项位置
    } else {
        searchDataList.value.unshift(queryStr)
    }

    linkGoodsList({
        query: {
            keyword: queryStr,
        },
    })
}

// 热门
const onSearchHot = (text: string) => {
    search.keyword = text
    onSearch()
}

// 下拉显示数据
const querySearchAsync = (queryString: string, callback: (arg: any) => void) => {
    const query = queryString?.trim() ?? ''
    if (query) {
        GoodsApi.searchKeyword({ keyword: queryString }).then((res) => {
            let results: { value: string }[] = []
            if (res.data.value && res.data.value.data.length > 0) {
                results = res.data.value.data.slice(0, 10).map((item) => {
                    return { value: item }
                })
            }
            callback(results)
        })
    } else {
        const dat = searchDataList.value.slice(0, 10).map(item => ({ value: item, history: 1 }))
        callback(dat)
    }
}

// 删除搜索记录
const onRemoveHistory = (item: string) => {
    const index = searchDataList.value.indexOf(item)
    if (index >= 0) searchDataList.value.splice(index, 1) // Remove item from list.
}

watch(() => route.query.keyword, (val) => {
    search.keyword = val ? val as string : ''
})
</script>

<style lang="scss" scoped>
.header-box {

    background-image: url('~/assets/images/banner-bg.png');
    background-position: top center;

    .cart-number {
        --el-bg-color: #ffa0a0;
    }

}

.search-box {

    :deep(.el-input) {
        --el-input-focus-border-color: transparent;
        // --el-input-border-radius: 10px;
    }

    // .el-input__wrapper,
    // .el-input {
    //   --el-input-border-radius: 10px;
    // }

    .el-input__wrapper {
        &.is-focus {
            box-shadow: none;
        }
    }

    :deep(.el-input-group__append) {
        overflow: hidden;
    }

    .btn-search {
        border-color: var(--el-button-bg-color);
        background-color: var(--el-button-bg-color);
        color: var(--el-color-white);
        --el-border-radius-base: 0;

        &:focus,
        &:hover {
            color: var(--el-button-hover-text-color);
            border-color: var(--el-button-hover-border-color);
            background-color: var(--el-button-hover-bg-color);
            outline: 0;
        }
    }
}

.search-hot {
    font-size: 12px;
    line-height: 1;
    position: absolute;
    left: 0px;
    margin-top: 5px;

    span {
        margin-right: 8px;
        color: var(--el-color-info-light-5);
        cursor: pointer;

        &:hover {
            color: var(--el-color-primary-light-3);
        }
    }
}
</style>

<style lang="scss">
.pop-search {
    .pop-item {
        .color-primary {
            display: none;
        }

        &:hover {
            .v1 {
                display: none;
            }

            .color-primary {
                display: block;
            }
        }
    }
}
</style>
