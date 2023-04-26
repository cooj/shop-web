<template>
  <div class="footer-box bg-#333">
    <div class="container">
      <div class="footer-top">
        <div class="feature-item">
          <img src="//storage.360buyimg.com/vipmro-pc/img/bottom/footer01.png" class="icon">
        </div>
        <div class="feature-item">
          <img src="//storage.360buyimg.com/vipmro-pc/img/bottom/footer02.png" class="icon">
        </div>
        <div class="feature-item">
          <img src="//storage.360buyimg.com/vipmro-pc/img/bottom/footer03.png" class="icon">
        </div>
        <div class="feature-item">
          <img src="//storage.360buyimg.com/vipmro-pc/img/bottom/footer04.png" class="icon">
        </div>
      </div>
      <div class="mid">
        <ul class="footer-link">
          <li v-for="item in navList" :key="item.id">
            <dl>
              <dt>{{ item.name }}</dt>
              <dd v-for="sub in item.children" :key="sub.id">
                <NuxtLink :to="`/content/list?id=${sub.id}`">
                  {{ sub.name }}
                </NuxtLink>
              </dd>
            </dl>
          </li>
        </ul>
        <div class="footer-right">
          <div class="footer-logo">
            <img class="mb15px" src="~/assets/images/shop-logo.png" alt="">
            <p> 售后电话 400 998 3304</p>
            <p>工作时间 9:00-18:00</p>
          </div>
          <div class="footer-code">
            <div class="footer-code-box text-center">
              <div class="mb5px">
                公众号二维码
              </div>
              <img class="w110px" src="https://images.gdbmro.com/index/public_code.jpg" alt="">
              <!-- <div class="footer-code-item">
                <div class="mb5px">
                  公众号二维码
                </div>
                <img class="w110px" src="https://images.gdbmro.com/index/public_code.jpg" alt="">
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bot">
      <div class="flex justify-between container">
        <div class="left">
          <NuxtLink class="mr5px">
            隐私政策
          </NuxtLink>
          <NuxtLink class="mr5px">
            用户协议
          </NuxtLink>
          <NuxtLink class="mr5px">
            网站导航
          </NuxtLink>
        </div>
        <div class="right">
          Copyright@2023
          工游记工业科技（深圳）有限公司
          版权所有
          <!-- 粤ICP备18004771号-1 -->
          {{ systemInfo?.icp }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { HomeApi } from '~/api/home/home'

// 获取系统信息
const useSystem = useSystemState()
const systemInfo = await useSystem.getSystemInfo()
// console.log('systemInfo :>> ', systemInfo)

// 获取底部导航
const { data: footer } = await HomeApi.getArticle()
const navList = ref(footer.value?.data)
// console.log('footer :>> ', footer)
</script>

<style lang="scss" scoped>
.footer-box {
  color: #fff;
  padding-top: 50px;

  .top {
    padding: 10px;
  }

  .mid {
    padding-bottom: 30px;
    border-bottom: 1px solid #555;
    display: flex;
    justify-content: space-between;
  }

  .footer-bot {
    font-size: 14px;
    padding: 15px 0;
    border-bottom: 5px solid var(--el-color-primary-light-3);
  }
}

.footer-top {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.footer-link {
  display: flex;

  li {
    width: 130px;

    dt {
      font-weight: bold;
    }

    dd {
      font-size: 14px;
      color: #ccc;
      margin: 5px 0;
    }
  }
}

.footer-right {
  width: 38%;
  display: flex;
  justify-content: space-between;
}
</style>
