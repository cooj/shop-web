<template>
    <section class="header-box">
        <el-form class="py25px" size="large">
            <div class="flex items-center justify-between text-#f8f8f8 container">
                <div class="logo min-w150px">
                    <NuxtLink to="/">
                        <img class="h50px" :src="systemInfo?.shop_logo" alt="">
                    </NuxtLink>
                </div>
                <div class="search-box relative w50%">
                    <el-input v-model="search.keyword" placeholder="" @keyup.enter="onSearch">
                        <template #prepend>
                            <lazy-el-select v-model="search.select" placeholder="" style="width: 115px">
                                <el-option label="全部商品" value="1" />
                                <el-option label="精选商品" value="2" />
                                <el-option label="特价商品" value="3" />
                            </lazy-el-select>
                        </template>
                        <template #append>
                            <el-button type="primary" class="btn-search min-w100px" @click="onSearch">
                                搜 索
                            </el-button>
                        </template>
                    </el-input>
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

                    <!-- <el-button>
            <i class="i-ep-shopping-cart-full" />
            批量下单
          </el-button> -->
                </div>
            </div>
        </el-form>

        <HeaderIndex />
    </section>
</template>

<script lang="ts" setup>
import HeaderIndex from './header/HeaderIndex.vue'

const useCartNumber = useCartNumberState()

const number = await useCartNumber.setCartNumber()

const route = useRoute()

const search = reactive({
    keyword: '',
    select: '1',
})

const useSystem = useSystemState()
const systemInfo = ref(useSystem.system)

const searchHot = computed(() => {
    const text = systemInfo.value?.hot ?? ''
    return text.split(',')
})

// 搜索
const onSearch = () => {
    if (search.keyword.trim()) {
        linkGoodsList({
            query: {
                keyword: search.keyword,
            },
        })
    } else if (route.path === '/goods/list') {
        linkGoodsList({
            query: {},
        })
    }
}

// 热门
const onSearchHot = (text: string) => {
    search.keyword = text
    onSearch()
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
