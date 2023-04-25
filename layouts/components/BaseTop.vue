<script lang="ts" setup>
const userState = useUserState()
const defData = reactive({
  username: '',
})
const initData = async () => {
  const user = await userState.getUserInfo()

  if (user.value) {
    defData.username = user.value.user_name
  }
}

// 退出登录
const onLoginOut = async () => {
  useLoginOut()
}

onBeforeMount(() => {
  initData()
})
</script>

<template>
  <section class="header-top bg-#313131 py5px">
    <div class="flex items-center justify-between text-13px text-#fff container">
      <div class="lt">
        <span class="line-height-20px">欢迎来到工游记商城!</span>
        <!-- <ClientOnly></ClientOnly> -->
        <template v-if="userState.token && defData.username">
          <NuxtLink to="/user">
            <el-button link>
              <span>您好！{{ defData.username }}</span>
            </el-button>
          </NuxtLink>
          <el-button type="danger" link @click="onLoginOut">
            <span>退出登录</span>
          </el-button>
        </template>
      </div>
      <div class="gt text-right">
        <el-button link>
          <i class="i-ep-location-information" />
          <span>广东省/深圳市</span>
        </el-button>
        <el-divider direction="vertical" />
        <NuxtLink to="/login">
          <el-button link>
            <i class="i-ep-user" />
            <span>登录</span>
          </el-button>
        </NuxtLink>
        <el-divider direction="vertical" />
        <el-button link>
          <span>注册</span>
        </el-button>
        <el-divider direction="vertical" />
        <el-button link>
          <span>企业购</span>
        </el-button>
        <el-divider direction="vertical" />
        <el-button link>
          <i class="i-ep-shopping-cart-full" />
          <span>购物车（0）</span>
        </el-button>
        <el-divider direction="vertical" />
        <el-button link readonly>
          <span>010-56003254568</span>
        </el-button>
      </div>
    </div>
  </section>
</template>

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
