<template>
  <section class="text-14px">
    <div class="container">
      <el-breadcrumb class="goods-breadcrumb" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>物性测试仪器</el-breadcrumb-item>
        <el-breadcrumb-item>试验机</el-breadcrumb-item>
        <el-breadcrumb-item>德卡</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form size="small">
        <div class="goods-attr">
          <div class="goods-attr-item">
            <div title="分类" class="left">
              分类
            </div>
            <div class="right">
              <div class="attr-list">
                <el-check-tag v-for="item in 10" :key="item" :checked="checked" @change="onChange">
                  断路器
                </el-check-tag>
              </div>
              <el-button class="mx4px my3px" size="small">
                展开
                <i class="i-ep-arrow-down" />
              </el-button>
              <el-button class="mx4px my3px" size="small">
                收起
                <i class="i-ep-arrow-up" />
              </el-button>
            </div>
          </div>
          <div class="goods-attr-item">
            <div title="品牌" class="left">
              品牌
            </div>
            <div class="right">
              <div class="attr-list">
                <el-check-tag v-for="item in 20" :key="item" :checked="checked" @change="onChange">
                  百度
                </el-check-tag>
              </div>
              <el-button class="mx4px my3px" size="small">
                展开/收起
                <i class="i-ep-arrow-up" />
              </el-button>
            </div>
          </div>
        </div>
        <div class="goods-opt">
          <dl class="goods-opt-dl">
            <dd class="goods-opt-item on cursor-pointer">
              默认
            </dd>
            <dd class="goods-opt-item cursor-pointer">
              销量
              <i class="i-ic-baseline-arrow-downward" />
            </dd>
            <dd class="goods-opt-item cursor-pointer">
              价格
              <i class="i-ep-sort" />
              <i class="i-ep-sort-up" />
              <i class="i-ep-sort-down" />
            </dd>
            <dd class="goods-opt-item checkbox">
              <el-checkbox v-model="form.is_stock" label="有库存" />
            </dd>
            <dd class="goods-opt-item">
              <el-input v-model="form.min_price" class="w70px!" size="small" placeholder="最低价" clearable />
              <span class="mx5px">-</span>
              <el-input v-model="form.max_price" class="w70px!" size="small" placeholder="最高价" clearable />
              <el-button class="ml5px" size="small">
                搜索
              </el-button>
            </dd>
          </dl>
          <dl class="goods-opt-dl">
            <dd class="goods-opt-item cursor-pointer" :class="{ show: defData.isList }" @click="toggleShowList(true)">
              <i class="i-ic-baseline-table-rows" />
            </dd>
            <dd class="goods-opt-item cursor-pointer" :class="{ show: !defData.isList }" @click="toggleShowList(false)">
              <i class="i-ep-menu" />
            </dd>
            <dd class="goods-opt-item b-0">
              共 4,694 件相关商品
            </dd>
          </dl>
        </div>
      </el-form>
      <div class="goods-list">
        <!-- 列表 -->
        <dl v-if="defData.isList" class="goods-list-dl">
          <dt class="goods-item-s">
            <div class="w500px px20px!">
              商品信息
            </div>
            <div class="w180px">
              品牌
            </div>
            <div class="w180px">
              型号
            </div>
            <div class="w150px">
              价格
            </div>
            <div class="flex-1 text-center">
              操作
            </div>
          </dt>
          <dd v-for="item in 10" :key="item" class="goods-item-s">
            <div class="g-info w500px">
              <div class="g-info-left">
                <NuxtLink to="/goods/detail-10" target="_blank">
                  <div class="lazyload-wrap sku-img-wrap real-image">
                    <img
                      src="https://private.zkh.com/PRODUCT/BIG/BIG_AA0979931_01.jpg?x-oss-process=style/WEBPCOM_style_350&amp;timestamp=1664162899000"
                      alt="FESTO/费斯托 调压阀 MS2-LR-M5-D6-AR-MPA-B 压力范围0.5~7bar 接口M5 附压力表 1个"
                      title="FESTO/费斯托 调压阀 MS2-LR-M5-D6-AR-MPA-B 压力范围0.5~7bar 接口M5 附压力表 1个" class=""
                    >
                  </div>
                </NuxtLink>
              </div>
              <div class="g-info-right">
                <div class="name">
                  <NuxtLink class="link" to="/goods/detail-10" target="_blank">
                    FESTO/费斯托 调压阀 MS2-LR-M5-D6-AR-MPA-B 压力范围0.5~7bar 接口M5 附压力表 1个
                  </NuxtLink>
                </div>
                <div class="tags">
                  <el-tag type="success">
                    自营
                  </el-tag>
                  <el-tag class="ml-5px" type="warning">
                    热销
                  </el-tag>
                  <el-tag class="ml-5px" type="danger">
                    精选
                  </el-tag>
                </div>
              </div>
            </div>
            <div class="g-brand w180px">
              FES TO/费斯托
            </div>
            <div class="g-code w180px">
              MS2-LR-M5-D6-AR-MPA-B
            </div>
            <!-- <div class="tw5 feature">
              <span>制造商型号：MS2-LR-M5-D6-AR-MPA-B</span><span>销售单位：个</span><span>压力范围：0.5~7bar</span><span>接口：M5</span><span>是否有压力表：是</span>
            </div>
            <div class="tw7 deliver-leadTime">
              <i class="deliver h24" data-v-0a47a9ed="">当日发货</i>
            </div> -->
            <div class="g-price w150px text-center">
              <div class="g-price-1">
                <i>￥</i><span class="integer">157</span><span class="decimal">.90</span><span class="unit">/个</span>
              </div>
              <div class="g-price-3">
                <i>￥</i><span class="integer">157</span><span class="decimal">.90</span><span class="unit">/个</span>
              </div>
              <div class="g-price-2">
                <span class="member-price">
                  ￥ ？
                </span>
                <span class="member-title">
                  会员价
                </span>
              </div>
            </div>
            <div class="flex-1 text-center">
              <el-button class="my10px" type="primary">
                <i class="i-carbon-shopping-cart" />
                <!-- <i class="i-ic-outline-shopping-cart"></i> -->
                加入购物车
              </el-button>
              <br>
              <el-button v-if="item % 2" class="focus">
                <i class="i-carbon-favorite-filled" />
                收藏
              </el-button>
              <el-button v-else>
                <i class="i-carbon-favorite" />
                收藏
              </el-button>
            </div>
          </dd>
        </dl>
        <!-- 网格 -->
        <ul v-else class="goods-list-ul">
          <li v-for="item in 11" :key="item">
            <div class="goods-list-item">
              <NuxtLink to="/goods/detail-500" target="_blank">
                <img
                  src="https://private.zkh.com/PRODUCT/BIG/BIG_AA0924616_01.jpeg?x-oss-process=style/WEBPCOM_style_350&amp;timestamp=1673973422000"
                  alt="LEEB/里博 布洛维转换手持式里氏硬度计 TH130 1台" title="LEEB/里博 布洛维转换手持式里氏硬度计 TH130 1台" class=""
                >
              </NuxtLink>

              <div class="goods-price">
                <div class="goods-price-left">
                  <i>￥</i><span class="integer">2580</span><span class="decimal">.00</span>
                  <span class="unit">/台</span>
                </div>
                <div class="goods-price-right">
                  <span class="member-price">
                    ￥ ？
                  </span>
                  <span class="member-title">
                    会员价
                  </span>
                </div>
              </div>
              <div class="goods-name" title="LEEB/里博 布洛维转换手持式里氏硬度计 TH130 1台">
                <NuxtLink to="/goods/detail-300" target="_blank">
                  LEEB/里博 布洛维转换手持式里氏<em>硬度计</em> TH130 1台 布洛维转换手持式里氏硬度计
                </NuxtLink>
              </div>
              <div class="goods-desc">
                <p class="truncate">
                  <span>订货编码：AA0924616</span><i class="iconfont copy-icon"></i>
                </p>
                <p class="truncate">
                  <span>制造商型号：TH130</span>
                </p>
              </div>
              <div class="goods-bot flex">
                <el-button v-if="item % 2" class="focus">
                  <i class="i-carbon-favorite-filled" />
                </el-button>
                <el-button v-else>
                  <i class="i-carbon-favorite" />
                </el-button>
                <el-button class="flex-1">
                  <i class="i-carbon-shopping-cart" />
                  <!-- <i class="i-ic-outline-shopping-cart"></i> -->
                  加入购物车
                </el-button>
              </div>
            </div>
          </li>
        </ul>
        <!-- <el-table :data="defData.tableData" style="width: 100%">
          <el-table-column prop="date" label="商品信息" width="180" />
          <el-table-column prop="name" label="品牌" width="180" />
          <el-table-column prop="name" label="型号" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table> -->
      </div>
      <div class="goods-pagination">
        <el-pagination
          v-model:current-page="defData.page" v-model:page-size="defData.pageSize"
          :page-sizes="defData.pageSizes" small background layout=" prev, pager, next,total, jumper"
          :total="defData.total"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 定义变量内容
const dlRefs = ref<HTMLDivElement[]>([])
const router = useRouter()

const checked = ref(false)

const onChange = (status: boolean) => {
  checked.value = status
}

const defData = reactive({
  isList: true, // 商品显示列表，还是网格
  breadcrumbList: [],
  tableData: [] as any[],
  page: 1,
  pageSize: 100,
  pageSizes: [100, 200, 300],
  total: 401,
})

const form = reactive({
  cate_id: [],
  brand_id: [],
  is_stock: false, // 是否有库存
  min_price: '', // 最低价
  max_price: '', // 最高价

})

// 切换商品显示列表
const toggleShowList = (param: boolean) => {
  if (defData.isList === param) return
  defData.isList = param
}

definePageMeta({
  layout: 'home',
})
</script>

<style scoped lang="scss">
.goods-breadcrumb {
  padding: 15px 0;
}

.goods-attr {

  background-color: var(--el-color-white);
  border: 1px solid var(--el-color-info-light-7);
  font-size: 14px;

}

.goods-attr-item {
  display: flex;
  --attr-left-width: 100px;
  --goods-item-height: 38px;

  +.goods-attr-item {
    border-top: 1px solid var(--el-color-info-light-7);
  }

  .left {
    width: var(--attr-left-width);
    line-height: var(--goods-item-height);
    padding: 0 8px;
    border-right: 1px solid var(--el-color-info-light-7);
    font-weight: bold;
  }

  .right {
    width: calc(100% - var(--attr-left-width));
    padding: 4px;
    display: flex;
    flex-wrap: wrap;

    .attr-list {
      flex: 1;
    }
  }

  :deep(.el-check-tag) {
    --el-color-info: #555;
    --el-color-info-light-9: transparent;
    line-height: 22px;
    padding: 0 5px;
    margin: 4px 5px;
    font-size: 12px;
    font-weight: normal;
  }

}

.goods-opt {
  --goods-opt-height: 38px;
  margin: 15px 0 7px;
  border: 1px solid var(--el-color-info-light-7);
  background-color: var(--el-color-white);
  display: flex;
  justify-content: space-between;
  height: var(--goods-opt-height);
  font-size: 12px;

  .goods-opt-dl {
    display: flex;

    &:nth-child(2n) {
      .goods-opt-item {
        border: 0;
        border-left: 1px solid var(--el-color-info-light-7);
      }
    }
  }

  .goods-opt-item {
    padding: 0 20px;
    line-height: var(--goods-opt-height);
    border-right: 1px solid var(--el-color-info-light-7);
    display: flex;
    align-items: center;
    color: var(--el-text-color-regular);

    &.on {
      background-color: var(--el-color-primary);
      color: var(--el-color-white)
    }

    &.checkbox {
      padding: 0;

      :deep(.el-checkbox) {
        padding: 0 20px;
        height: 100%;
      }
    }

    &.show {
      color: var(--el-color-primary);
    }
  }
}
.goods-list-ul {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(5, 1fr);
    padding: 10px 0;
}

// 网格
.goods-list-item {
  padding: 10px;
  background-color: var(--el-color-white);
  border-radius: 2px;

  &:hover {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .12);
  }

  .goods-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;

    .goods-price-left {
      font-size: 16px;
      font-weight: bold;
      color: var(--el-color-primary);

      .unit {
        font-size: 14px;
        color: #666;
        padding-left: 4px;
      }
    }
  }

  .goods-name {
    font-size: 14px;
    color: #000;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .goods-desc {
    font-size: 12px;
  }

  .goods-bot {
    .focus {
      color: var(--el-button-hover-text-color);
      border-color: var(--el-button-hover-border-color);
      background-color: var(--el-button-hover-bg-color);
      outline: 0;
    }
  }
}

// 列表
.goods-list-dl {
  background-color: var(--el-color-white);

  .goods-item-s {
    display: flex;
    padding: 12px 0;

    +.goods-item-s {
      border-top: 1px dashed var(--el-color-info-light-7);
    }

    &>* {
      padding: 0 8px;
    }

    .g-info {
      display: flex;
      --goods-info-img-width: 100px;

      .g-info-left {
        width: var(--goods-info-img-width);
      }

      .g-info-right {
        width: calc(100% - var(--goods-info-img-width));
        padding: 0 10px;

        .name {
          height: 48px;
          margin-bottom: 5px;

          .link {
            line-height: 24px;
            max-height: 48px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;

            &:hover {
              cursor: pointer;
              color: var(--el-color-primary);
              text-decoration: underline;
            }
          }
        }
      }
    }

    .g-price {
      padding: 5px;

      &-1 {
        color: var(--el-color-primary);
        font-size: 16px;
        font-weight: bold;

        .unit {
          font-size: 14px;
          color: #666;
          padding-left: 4px;
        }
      }

      &-2 {
        display: inline-block;
        border: 1px solid var(--el-color-primary-light-3);
        padding: 0 2px;
        font-size: 12px;
      }

      &-3 {
        color: #999;
        text-decoration: line-through;
        font-size: 12px;
      }

    }
  }

  dd.goods-item-s:hover {
    background-color: #fafafa;
  }
}

.goods-pagination {
  padding: 20px 0;

  :deep(.el-pagination) {
    --el-pagination-button-bg-color: var(--el-color-white);
    justify-content: center;
    --el-disabled-bg-color: var(--el-border-color);
  }
}
</style>
