<!-- 商品分类 -->
<template>
  <div class="goods-class-tle">
    <!-- <i class="i-carbon-list" /> -->
    <i class="i-ic-outline-format-list-bulleted" />
    <span class="ml8px">商品分类</span>
    <ul class="goods-class-child">
      <li>
        <NuxtLink to="/" @mouseenter="showGoodsPane()">
          <i class="i-ep-service" />
          <span>商品分类</span>
        </NuxtLink>
        <div class="goods-class-pane">
          <el-form-item label="硬度计">
            <NuxtLink to="/">
              <i class="i-ep-service" />
              <span>商品分类</span>
            </NuxtLink>
            <NuxtLink to="/">
              <i class="i-ep-service" />
              <span>商品分类</span>
            </NuxtLink>
            <NuxtLink to="/">
              <i class="i-ep-service" />
              <span>商品分类</span>
            </NuxtLink>
          </el-form-item>
        </div>
      </li>
      <li v-for="item in cate?.data" :key="item.cat_id">
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
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { GoodsApi } from '~/api/goods/list'

const defData = reactive({
  active: -1,
  show: false,
})

const showGoodsPane = () => {

}
// 获取商品分类
const { data: cate } = await GoodsApi.getClass()
//
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
    background-color: var(--el-color-info-light-8);

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
</style>
