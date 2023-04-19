<template>
  <section class="goods-detail">
    <div class="container">
      <el-breadcrumb class="goods-breadcrumb my15px" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>物性测试仪器</el-breadcrumb-item>
        <el-breadcrumb-item>试验机</el-breadcrumb-item>
        <el-breadcrumb-item>德卡</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="goods-main">
        <div class="goods-zoom">
          <GoodsImgZoom v-if="(defData.imgList.length > 0)" :images="defData.imgList" />
          <div v-else class="image-err">
            <i class="i-ep-picture" />
          </div>
        </div>
        <div class="goods-cen">
          <div class="goods-tle">
            元立 35K(碳钢) GB5782 M6*60 8.8级 发黑
          </div>

          <ul class="goods-pros">
            <li class="items-center bg-#f8f8f8">
              <div class="lt">
                价格
              </div>
              <div class="gt">
                <div class="price1">
                  <b>￥30.00<span>/包</span></b>
                  <span class="price2 ml8px">50.00</span>
                </div>
              </div>
            </li>
            <li>
              <div class="lt">
                商品编号
              </div>
              <div class="gt">
                VISORGNO
              </div>
            </li>
            <li>
              <div class="lt">
                商品型号
              </div>
              <div class="gt">
                101305-黑色
              </div>
            </li>
            <li>
              <div class="lt">
                品牌
              </div>
              <div class="gt">
                0.迪塞福
              </div>
            </li>
            <li>
              <div class="lt">
                重量
              </div>
              <div class="gt">
                0.2170kg
              </div>
            </li>
            <li>
              <div class="lt">
                库存
              </div>
              <div class="gt">
                有货
              </div>
            </li>
            <li>
              <div class="lt">
                支付方式
              </div>
              <div class="gt">
                <el-button text bg size="small" class="cursor-default!">
                  <i class="i-ic-baseline-wechat c-#09bb07 mr3px" />
                  微信
                </el-button>
                <el-button text bg size="small" class="cursor-default!">
                  <i class="i-ic-baseline-payment c-#3887ff mr3px" />
                  在线支付
                </el-button>
                <el-button text bg size="small" class="cursor-default!">
                  <i class=" i-ic-twotone-payments c-#ff5335 mr3px" />
                  线下转账
                </el-button>
              </div>
            </li>
            <li class="items-center">
              <div class="lt">
                购买数量
              </div>
              <div class="gt">
                <el-input-number v-model="form.number" :min="1" :max="10000" />
                <span class="ml5px c-#aaa">起购量:1个</span>
              </div>
            </li>
            <li class="my8px b-t b-t-dashed">
              <!--  -->
            </li>
            <li class="buy-item">
              <div class="lt">
                <!-- 购买数量 -->
              </div>
              <div class="gt">
                <el-button type="primary" size="large">
                  立即购买
                </el-button>
                <el-button type="primary" plain size="large">
                  <i class="i-carbon-shopping-cart mr3px" />
                  加入购物车
                </el-button>
              </div>
            </li>
          </ul>
        </div>
        <div class="goods-right">
          <img src="https://www.gdbmro.com/goodsImg/lADPDgtYxBInjCPNAW7M1w_215_366.jpg" alt="">
        </div>
      </div>
      <div class="goods-cont">
        <div class="lt">
          <el-tabs v-model="defData.leftActive" class="goods-lt-tabs">
            <el-tab-pane label="推荐商品" name="1">
              <ul class="goods-list">
                <li v-for="item in 5" :key="item">
                  <NuxtLink class="pos">
                    <img
                      src="https://private.zkh.com/PRODUCT/BIG/BIG_AA0924616_01.jpeg?x-oss-process=style/WEBPCOM_style_350&amp;timestamp=1673973422000"
                      alt="LEEB/里博 布洛维转换手持式里氏硬度计 TH130 1台" title="LEEB/里博 布洛维转换手持式里氏硬度计 TH130 1台" class="">
                  </NuxtLink>
                  <div class="tle">
                    <NuxtLink>LEB/里博 布洛维转换手持式里氏硬度计 TH130 1台 </NuxtLink>
                  </div>
                  <div class="pce">
                    <span>￥1500.56</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="gt">
          <el-tabs v-model="defData.rightActive" class="goods-gt-tabs">
            <el-tab-pane label="商品详情" name="1">
              <img src="https://image3.vipmro.net/goodsImg/999999/60221211/01675/201901041334/001b01-detail_show!.jpg">
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const defData = reactive({
  imgList: ['https://image3.vipmro.net/goodsImg/999999/50111114/00025/201904120958/003a03!800800.jpg'] as string[],
  leftActive: '1',
  rightActive: '1',
})

const form = reactive({
  number: 1, // 购买数量
})

definePageMeta({
  layout: 'home',
})
</script>

<style lang="scss" scoped>
.goods-main {
  display: flex;
  justify-content: space-between;
  --goods-img-zoom-width: 400px;
  --goods-right-width: 210px;

  .goods-zoom {
    width: var(--goods-img-zoom-width);
    background-color: var(--el-color-white);

    :deep(.swiper-box) {
      margin-bottom: 10px;
      --swiper-navigation-sides-offset: 8px;

      .swp {
        width: calc(100% - 60px);
      }

    }
  }

  .goods-cen {
    --goods-cen-left-blank: 10px;
    width: calc(100% - var(--goods-img-zoom-width) - var(--goods-right-width) - var(--goods-cen-left-blank));
    margin-left: var(--goods-cen-left-blank);
    background-color: var(--el-color-white);
    padding: 10px;
    padding-left: 20px;
    padding-top: 20px;
  }

  .goods-right {
    width: var(--goods-right-width);
    background-color: var(--el-color-white);
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .goods-tle {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .goods-pros {

    >li {
      font-size: 14px;
      display: flex;
      text-align: left;
      font-weight: normal;
      // line-height: 24px;
      line-height: 1.6;

      .lt {
        width: 80px;
        padding: 5px 8px;

        color: var(--el-text-color-secondary);
      }

      .gt {
        flex: 1;
        padding: 5px 8px;
        color: var(--el-text-color-primary);

        .price1 {

          b {
            font-size: 28px;
            color: var(--el-color-primary);

            span {
              font-size: 70%;
              font-weight: normal;
            }
          }

        }

        .price2 {
          font-size: 16px;
          text-decoration: line-through;
          color: var(--el-text-color-secondary);
        }
      }
    }

    .buy-item {
      :deep(.el-button) {
        --el-font-size-base: 16px;
      }
    }

  }
}

.goods-cont {
  display: flex;
  justify-content: space-between;
  --goods-cont-left-width: 250px;
  margin: 20px 0;

  .lt {
    width: var(--goods-cont-left-width);

    :deep(.el-tabs--top) {

      // :not(:last-child)
      .el-tabs__item.is-top:nth-child(2) {
        margin-left: 20px;
      }
    }
  }

  .gt {
    width: calc(100% - var(--goods-cont-left-width) - 10px);
    background-color: var(--el-color-white);

  }

  :deep(.el-tabs--top) {

    // :not(:last-child)
    .el-tabs__item {
      font-weight: bold;
    }

    .el-tabs__item.is-top:nth-child(2) {
      // padding-left: 20px;
      margin-left: 20px;
    }
  }

  :deep(.el-tabs__content) {
    padding: 10px;
  }

  .goods-lt-tabs {
    background-color: var(--el-color-white);
    min-height: 350px;
  }

  .goods-gt-tabs {
    :deep(.el-tabs__content) {
      padding: 15px;
    }
  }
}

.goods-list {
  li {
    padding: 10px;

    +li {
      border-top: 1px dashed var(--el-border-color-light);
    }
  }

  .pos {
    padding-bottom: 100%;
    display: block;
  }

  .tle {
    height: 40px;
    margin-bottom: 8px;

    a {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 20px;
      max-height: 40px;
      font-size: 14px;
      color: var(--el-text-color-regular);

      &:hover {
        cursor: pointer;
        color: var(--el-color-primary);
        text-decoration: underline;
      }
    }
  }

  .pce {
    font-size: 13px;
    font-weight: bold;
    color: var(--el-color-primary);
  }
}
</style>
