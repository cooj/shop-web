<!-- 个人信息 -->

<template>
  <div class="user-card p15px">
    <div class="user-welcome">
      <div class="user-login">
        <div class="flex items-center">
          <div class="face">
            <el-image v-if="userData?.user_id && userData?.headimgurl" class="h58px w58px" :src="userData?.headimgurl" />
            <i v-else class="i-carbon-user-avatar-filled-alt block text-48px" />
          </div>
          <div class="text-14px font700">
            <p> 欢迎光临工游记商城</p>
            <p v-if="userData?.user_id">
              你好！{{ userData?.user_name }}
            </p>
          </div>
        </div>
        <div v-if="userData?.user_id" class="pt12px text-center">
          <NuxtLink to="/user" class="mr20px">
            <el-button class="min-w70px" type="danger" size="small">
              个人中心
            </el-button>
          </NuxtLink>
          <el-button class="min-w70px" type="info" size="small" plain @click="onLoginOut">
            退出登录
          </el-button>
        </div>
        <div v-else class="pb15px pt10px text-center">
          <NuxtLink to="/login/register">
            <el-button class="min-w70px" type="primary" size="small">
              注 册
            </el-button>
          </NuxtLink>
          <NuxtLink to="/login" class="ml10px">
            <el-button class="min-w70px" type="primary" size="small" plain>
              登 录
            </el-button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="user-tle">
      企业会员权益
    </div>
    <div class="user-warp">
      <ul class="user-warp-ul">
        <li>
          <a target="_blank">
            <div class="icon-box"><img src="//static.zkh360.com/image/2022-10-13/huiyuanjia-1665627779233.png">
            </div>
            <div>专享会员价</div>
          </a>
        </li>
        <li>
          <a target="_blank">
            <div class="icon-box"><img src="//static.zkh360.com/image/2022-10-13/quanbao-1665627779230.png"></div>
            <div>降本券包</div>
          </a>
        </li>
        <li>
          <a target="_blank">
            <div class="icon-box"><img src="//static.zkh360.com/image/2022-10-13/mianyou-1665627779224.png"></div>
            <div>首单免邮</div>
          </a>
        </li>
        <li>
          <a target="_blank">
            <div class="icon-box"><img src="//static.zkh360.com/image/2022-10-13/quanyi-1665627779238.png"></div>
            <div>帐期权益</div>
          </a>
        </li>
        <li>
          <a target="_blank">
            <div class="icon-box"><img src="//static.zkh360.com/image/2022-10-13/zuzhiguanli-1665627779225.png">
            </div>
            <div>组织管理</div>
          </a>
        </li>
        <li>
          <a target="_blank">
            <div class="icon-box"><img src="//static.zkh360.com/image/2022-10-13/kefu1-1665627779219.png"></div>
            <div>专属客服</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const userState = useUserState()
const userData = await userState.getUserInfo()
console.log('userData :>> ', userData);

/**
 * 退出登录
 */
const onLoginOut = () => {
  useLoginOut()
}
</script>

<style lang="scss" scoped>
.user-card {
  height: 100%;
  --m-welcome-height: 110px;
  --m-tle-height: 40px;

  .user-welcome {
    height: var(--m-welcome-height);
  }

  .user-tle {
    padding-top: 15px;
    border-top: 1px solid var(--el-border-color);
    font-size: 14px;
    font-weight: 700;
  }

  .user-warp {
    height: calc(100% - var(--m-welcome-height) - var(--m-tle-height));
    padding-top: 10px;

    &-ul {
      height: 100%;
      display: grid;
      grid-gap: 2px;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;

      li {
        >a {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100%;
          width: 100%;
          font-size: 12px;

          &:hover {
            box-shadow: 0 0 8px 0 rgba(65, 65, 65, .2);
            border-radius: 3px;
          }

          .icon-box {
            margin-bottom: 8px;
          }

          img {
            width: 24px;
            margin: 0 auto;
          }
        }
      }
    }
  }

  .user-login {
    .face {
      color: var(--el-text-color-regular);
      margin-right: 5px;
      height: 58px;
    }
  }

}
</style>
