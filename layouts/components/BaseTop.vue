<template>
    <section class="header-top">
        <div class="header-cont container">
            <div class="lt flex items-center">
                <template v-if="userState.token && username">
                    <NuxtLink to="/user" class="hov-item">
                        您好！{{ username }}
                    </NuxtLink>
                    <span class="mx5px">欢迎来到工游记商城!</span>
                    <NuxtLink class="hov-item-exit" @click="onLoginOut">
                        退出
                    </NuxtLink>
                </template>
                <template v-else>
                    <span class="mr10px">欢迎来到工游记商城!</span>
                    <NuxtLink to="/login" class="hov-item">
                        登录
                    </NuxtLink>
                    <el-divider direction="vertical" />
                    <NuxtLink to="/login/register" class="hov-item">
                        注册
                    </NuxtLink>
                </template>
            </div>
            <div class="gt flex items-center">
                <!-- <el-button link>
                    <i class="i-ep-location-information" />
                    <span>广东省/深圳市</span>
                </el-button>
                <el-divider direction="vertical" /> -->
                <template v-if="userState.token && username">
                    <NuxtLink to="/order/list" class="hov-item">
                        我的订单
                    </NuxtLink>
                    <el-divider direction="vertical" />
                </template>
                <NuxtLink to="/order/cart" class="hov-item flex items-center">
                    <i class="i-ep-shopping-cart-full mr2px" />
                    <span>购物车({{ number }})</span>
                </NuxtLink>
                <el-divider direction="vertical" />
                <NuxtLink to="/list/site" class="hov-item">
                    网站导航
                </NuxtLink>
                <el-divider direction="vertical" />
                <NuxtLink>
                    帮助中心
                </NuxtLink>
                <!-- <el-button link>
                    <span>帮助中心</span>
                </el-button> -->
                <el-divider direction="vertical" />
                <NuxtLink to="/sale" class="hov-item">
                    售后中心
                </NuxtLink>
                <el-divider direction="vertical" />
                <span class="mr5px">{{ systemInfo?.sale_tel }}</span>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
const userState = useUserState()
const useSystem = useSystemState()
const useCartNumber = useCartNumberState()

// 获取商城信息
const systemInfo = await useSystem.getSystemInfo()

// 用户信息
const user = await userState.getUserInfo()

const username = computed(() => user.value?.user_name)

// 购物车商品数量
const number = await useCartNumber.setCartNumber()

// 退出登录
const onLoginOut = async () => {
    useLoginOut()
}
</script>

<style lang="scss" scoped>
.header-top {
    padding: 6px 0 5px;
    background-color: #313131;

    .header-cont {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        color: var(--el-color-white);
    }

    .hov-item {
        &:hover {
            color: var(--el-color-info);
        }
    }

    .hov-item-exit {
        cursor: pointer;
        color: var(--el-color-danger-light-3);

        &:hover {
            color: var(--el-color-danger-light-8);
        }
    }
}
</style>
