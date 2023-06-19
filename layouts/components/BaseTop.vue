<template>
    <section class="header-top bg-#313131 py5px">
        <div class="flex items-center justify-between text-13px text-#fff container">
            <div class="lt flex items-center">
                <template v-if="userState.token && username">
                    <NuxtLink to="/user">
                        <el-button link>
                            <span>您好！{{ username }}</span>
                        </el-button>
                    </NuxtLink>
                    <span class="mx5px">欢迎来到工游记商城!</span>
                    <el-button type="danger" link @click="onLoginOut">
                        退出
                    </el-button>
                </template>
                <template v-else>
                    <span class="mr5px">欢迎来到工游记商城!</span>
                    <NuxtLink to="/login">
                        <el-button link>
                            <!-- <i class="i-ep-user" /> -->
                            <span>登录</span>
                        </el-button>
                    </NuxtLink>
                    <el-divider direction="vertical" />
                    <NuxtLink to="/login/register">
                        <el-button link>
                            <span>注册</span>
                        </el-button>
                    </NuxtLink>
                </template>
            </div>
            <div class="gt text-right">
                <!-- <el-button link>
                    <i class="i-ep-location-information" />
                    <span>广东省/深圳市</span>
                </el-button>
                <el-divider direction="vertical" /> -->
                <template v-if="userState.token && username">
                    <NuxtLink to="/order/list">
                        <el-button link>
                            我的订单
                        </el-button>
                    </NuxtLink>
                    <el-divider direction="vertical" />
                </template>

                <NuxtLink to="/login">
                    <el-button link>
                        <i class="i-ep-shopping-cart-full" />
                        <span>购物车({{ number }})</span>
                    </el-button>
                </NuxtLink>
                <el-divider direction="vertical" />
                <NuxtLink to="/">
                    <el-button link>
                        <span>网站导航</span>
                    </el-button>
                </NuxtLink>
                <el-divider direction="vertical" />
                <el-button link>
                    <span>帮助中心</span>
                </el-button>
                <el-divider direction="vertical" />
                <NuxtLink to="/sale">
                    <el-button link>
                        <span>售后中心</span>
                    </el-button>
                </NuxtLink>
                <!-- <el-divider direction="vertical" />
                <el-button link>
                    <i class="i-ep-shopping-cart-full" />
                    <span>购物车（0）</span>
                </el-button> -->
                <el-divider direction="vertical" />
                <el-button link readonly>
                    <span>{{ systemInfo?.sale_tel }}</span>
                </el-button>
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
    .el-button {
        --el-button-text-color: #fff;
        --el-font-size-base: 13px;

        &.el-button--danger {
            --el-button-text-color: var(--el-color-danger-light-8);
        }
    }
}
</style>
