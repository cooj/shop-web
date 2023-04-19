<script lang="ts" setup>

</script>

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
          <li>
            <dl>
              <dt>购物指南</dt>
              <dd><a href="/help/orders.html" target="_blank">帮助中心</a></dd>
              <dd><a href="/brand.html" target="_blank">品牌中心</a></dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>付款方式</dt>
              <dd><a href="/help/payments.html" target="_blank">付款开票信息</a></dd>
              <dd><a href="/help/payments.html" target="_blank">如何支付</a></dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>服务政策</dt>
              <dd><a href="/help/shipping-inspections.html#section1" target="_blank">配送服务</a></dd>
              <dd><a href="/help/returns-replacements.html" target="_blank">售后服务</a></dd>
              <dd><a href="/help/terms/privacy.html" target="_blank">隐私政策</a></dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt><a href="/content/" target="_blank">内容中心</a></dt>
              <dd><a href="/content/list/c-10010.html" target="_blank">震坤行大事件</a></dd>
              <dd><a href="/content/list/c-10009.html" target="_blank">客户之声</a></dd>
              <dd><a href="/content/list/c-10004.html" target="_blank">知识社区</a></dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>关于我们</dt>
              <dd><a href="/help/about-us.html" target="_blank">公司介绍</a></dd>
              <dd><a href="/help/contact-us.html" target="_blank">联系我们</a></dd>
              <dd><a href="http://imart360.zhiye.com/home" target="_blank" rel="nofollow">加入我们</a></dd>
              <dd><a href="/roadmap.html" target="_blank" rel="nofollow">网站导航</a></dd>
            </dl>
          </li>
        </ul>
        <div class="footer-logo">
          <img class="mb15px" src="~/assets/images/shop-logo.png" alt="">
          <p> 售后电话 400 998 3304</p>
          <p>工作时间 9:00-18:00</p>
        </div>
        <div class="footer-code">
          <div class="footer-code-box text-center">
            <div class="footer-code-item">
              <div class="mb5px">
                公众号二维码
              </div><img class="w110px" src="https://images.gdbmro.com/index/public_code.jpg" alt="">
            </div>
            <div class="footer-code-item">
              <div class="mb5px">
                更多资讯
              </div><img class="w110px" src="https://images.gdbmro.com/index/mobileQRCode.jpg" alt="">
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
          粤ICP备18004771号-1
        </div>
      </div>
    </div>
  </div>
</template>

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

.footer-code-box {
  display: flex;

  .footer-code-item {
    width: 50%;
    padding: 5px;
  }
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
</style>
