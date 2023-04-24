<!-- 商品分类 -->
<template>
  <div class="goods-class-tle">
    <!-- <i class="i-carbon-list" /> -->
    <i class="i-ic-outline-format-list-bulleted" />
    <span class="ml8px">商品分类</span>
    <ul v-if="0" class="goods-class-child">
      <li v-for="item in cateList" :key="item.cat_id">
        <div class="card">
          <div class="tle flex items-center text-12px font-bold">
            <div class="w20px">
              <i class="i-ep-service block" />
            </div>
            <h6>{{ item.cat_name }}</h6>
          </div>
          <div class="flex">
            <div class="w20px" />
            <div class="card-link flex-1 text-12px">
              <NuxtLink
                v-for="sub in item.children" :key="sub.cat_id" class="mr4px inline-block"
                :to="linkGoodsList({ query: { cid: sub.cat_id }, url: true })"
              >
                <span>{{ sub.cat_name }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="goods-class-pane">
          <dl>
            <dd v-for="sub in item.children" :key="sub.cat_id">
              <div class="lt">
                <NuxtLink :to="`/goods/list?c=${sub.cat_id}`">
                  {{ sub.cat_name }}
                </NuxtLink>
              </div>
              <div class="ico">
                <i class="i-ep-arrow-right" />
              </div>
              <div class="gt">
                <NuxtLink v-for="son in sub.children" :key="son.cat_id" :to="`/goods/list?c=${son.cat_id}`">
                  {{ son.cat_name }}
                </NuxtLink>
              </div>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
    <ul class="goods-class-child all">
      <!-- <li v-for="item in cate?.data" :key="item.cat_id">
        <NuxtLink :to="`/goods/list?c=${item.cat_id}`">
          <i class="i-ep-service" />
          <span>{{ item.cat_name }}</span>
        </NuxtLink>
        <div class="goods-class-pane">
          <dl>
            <dd v-for="sub in item.children" :key="sub.cat_id">
              <div class="lt">
                <NuxtLink :to="`/goods/list?c=${sub.cat_id}`">
                  {{ sub.cat_name }}
                </NuxtLink>
              </div>
              <div class="ico">
                <i class="i-ep-arrow-right" />
              </div>
              <div class="gt">
                <NuxtLink v-for="son in sub.children" :key="son.cat_id" :to="`/goods/list?c=${son.cat_id}`">
                  {{ son.cat_name }}
                </NuxtLink>
              </div>
            </dd>
          </dl>
        </div>
                              </li> -->
      <li v-for="item in 17" :key="item">
        <NuxtLink to="/" @mouseenter="showGoodsPane()">
          <i class="i-ep-service" />
          <span>商品分类</span>
        </NuxtLink>
        <div class="goods-class-pane">
          <dl>
            <dd v-for="sub in 5" :key="sub">
              <div class="lt">
                <NuxtLink :to="`/goods/list?c=${sub}`">
                  商品分类{{ item }}-{{ sub }}
                </NuxtLink>
              </div>
              <div class="ico">
                <i class="i-ep-arrow-right" />
              </div>
              <div class="gt">
                <NuxtLink v-for="son in 3" :key="son" :to="`/goods/list?c=${son}`">
                  硬度计{{ item }}-{{ sub }}-{{ son }}
                </NuxtLink>
              </div>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const goodsState = useGoodsStore()

const defData = reactive({
  active: -1,
  show: false,
})

// 获取商品分类
const cateList = await goodsState.getGoodsClass()
// 获取商品分类
// const { data: cate } = await GoodsApi.getClass()
//

const showGoodsPane = () => {

}
</script>

<style lang="scss" scoped>
.goods-class-tle {
  width: 100%;
  height: 100%;
  background: var(--el-color-primary);
  color: var(--el-color-white);
  display: flex;
  align-items: center;
  padding: 5px 10px;

  &:hover .goods-class-child {
    display: block;
  }
}

.goods-class-child {
  width: 100%;
  height: var(--banner-height);
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--el-color-white);
  color: #333;
  display: none;
  // box-shadow: -1px 3px 12px -1px rgba(0, 0, 0, .3);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  .card {
    --b-border-width: 10px;
    padding: var(--b-border-width);
    // background-color: #333;
    position: relative;
    z-index: 1;

    &::after {
      --b-position-width: 7px;
      content: '';
      display: block;
      position: absolute;
      top: var(--b-position-width);
      left: var(--b-position-width);
      width: calc(100% - var(--b-position-width) * 2);
      height: calc(100% - var(--b-position-width) * 2);
      // background-color: var(--el-color-info-light-8);
      z-index: -1;
      border-radius: 2px;
    }

    &-link {
      >a:hover {
        color: var(--el-color-primary);
      }
    }
  }

  li>a {
    display: flex;
    align-items: center;
    // padding: 5px 10px;
    font-size: 15px;
    line-height: 48px;
    padding: 0 10px;

    i {
      margin-right: 5px;
    }
  }

  li:hover {
    .card::after {
      background-color: var(--el-color-info-light-8);
    }

    .goods-class-pane {
      display: block;
    }
  }
}

.goods-class-pane {
  position: absolute;
  top: 0;
  left: 100%;
  width: var(--banner-width);
  height: var(--banner-height);
  background-color: #fff;
  overflow: auto;
  display: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .05);
  padding: 10px;

  dd {
    display: flex;
    font-size: 13px;
    line-height: 22px;
    --dd-left-width: 100px;
    padding: 5px 0;

    +dd {
      border-top: 1px dotted var(--el-border-color);
    }

    .lt {
      width: var(--dd-left-width);
      font-weight: bold;
      padding-left: 4px;
    }

    .ico {
      width: 30px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        display: block;
        width: 1em;
        height: 1em;
      }
    }

    .gt {
      flex: 1;

      a {
        display: inline-block;
        margin-right: 15px;
        // color: var(--el-text-color-secondary);
        color: var(--el-text-color-regular);
      }

    }

    a:hover {
      color: var(--el-color-primary);
    }
  }
}

:global(body .nav-banner.index .goods-class-child.all) {
  display: flex !important;
  flex-direction: column;
  // .goods-class-child.all {
  //   display: flex !important;
  //   flex-direction: column;
  // }

}

:global(body .nav-banner.index .goods-class-child.all li) {
  height: calc(100% / 17);
}

:global(body .nav-banner.index .goods-class-child.all li>a) {
  line-height: 100%;
  height: 100%;
}

.goods-class-child.all li:hover {
  >a {
    background-color: var(--el-color-info-light-8);
  }

  // color: var(--el-text-color-regular);
}
</style>
