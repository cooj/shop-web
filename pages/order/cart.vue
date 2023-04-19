<template>
  <section class="text-14px">
    <div class="container">
      <el-breadcrumb class="goods-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>购物车</el-breadcrumb-item>
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
  middleware: 'auth',
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
</style>
