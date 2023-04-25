<!-- 个人信息 -->

<template>
  <div class="user-card p15px">
    <div class="user-welcome">
      <div class="user-login">
        <div class="flex items-center">
          <div class="face">
            <i class="i-carbon-user-avatar-filled-alt block text-48px" />
          </div>
          <p class="text-14px font700">
            欢迎光临工游记商城
          </p>
        </div>
        <div class="pb15px pt10px text-center">
          <el-button class="min-w70px" type="primary" size="small">
            注 册
          </el-button>
          <el-button class="min-w70px" type="primary" size="small" plain>
            登 录
          </el-button>
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

    &-ul {
      height: 100%;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 50%;
        text-align: center;

        .icon-box {
          img {

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
    }
  }

}
</style>
