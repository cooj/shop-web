<template>
  <section class="pb30px text-14px">
    <div class="container">
      <el-breadcrumb class="py15px">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>购物车</el-breadcrumb-item>
      </el-breadcrumb>
      <ClientOnly>
        <div class="table-cart">
          <ElTable ref="tableRef" :data="defData.tableData" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="goods_name" label="商品名称" min-width="180">
              <template #default="{ row }">
                <div class="h50px flex">
                  <div class="goods_img">
                    <el-image class="h50px w50px" :src="row.goods_img" />
                  </div>
                  <div class="pl10px">
                    <NuxtLink to="/goods/detail?id=10">
                      {{ row.goods_name }}
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="goods_code" label="商品型号" width="160" />
            <el-table-column prop="goods_spec" label="商品规格" width="160" />
            <el-table-column prop="goods_price" label="价格" width="120" align="center">
              <template #default="{ row }">
                <div class="goods_price">
                  {{ row.goods_price }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="goods_num" label="商品数量" width="150" align="center">
              <template #default="{ row }">
                <el-input-number v-model="row.goods_num" class="w100%!" :precision="0" :min="0" :max="100" />
              </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="100" align="center">
              <template #default="{ row }">
                <el-button type="primary" link @click="onRemove(row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </ElTable>
        </div>
        <div class="table-cart-count">
          <div class="lt">
            <el-button type="primary" link @click="onRemoveChose">
              删除所选商品
            </el-button>
            <!-- <el-button type="primary" link>
            继续购物
          </el-button> -->
          </div>
          <div class="gt">
            <NuxtLink to="/order/confirm">
              go
            </NuxtLink>
            商品总价（未包含运费）： <b class="main-color text-20px">{{ countMoney }}</b> 元
            <el-button class="ml5px" type="primary">
              结算商品
            </el-button>
          </div>
          <!-- https://private.zkh.com/PRODUCT/BIG/BIG_AC2415_02.jpg?x-oss-process=style/common_style_600&timestamp=1675233700000 -->
        </div>
        <BaseUpload v-model="defData.url" />
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ElTable } from 'element-plus'
import Big from 'big.js'
import { GoodsApi } from '~/api/goods/list'

interface GoodsTableCartItem {
  goods_name: 'good海尔彩电LE32G310G 32'
  goods_img: string
  goods_price: 100 // 价格
  goods_num: 1 // 购买数量
  goods_id: 1
  goods_code: '2020-01-01' // 型号
  goods_spec: '广东省深圳市南山区' // 规格
}

const tableRef = ref<InstanceType<typeof ElTable>>()

const defData = reactive({
  url: '',
  breadcrumbList: [],
  tableData: [
    {
      goods_name: 'good海尔彩电LE32G310G 32',
      goods_img: 'https://private.zkh.com/PRODUCT/BIG/BIG_AC2415_02.jpg?x-oss-process=style/common_style_600&timestamp=1675233700000',
      goods_price: 100, // 价格
      goods_num: 1, // 购买数量
      goods_id: 1,
      goods_code: '2020-01-01', // 型号
      goods_spec: '广东省深圳市南山区', // 规格
    },
    {
      goods_name: '海尔彩电LE32G310G 32',
      goods_img: '',
      goods_price: 100, // 价格
      goods_num: 1, // 购买数量
      goods_id: 2,
      goods_code: '2-01-01', // 型号
      goods_spec: 'sds', // 规格
    },
  ] as GoodsTableCartItem[],
  selectData: [] as GoodsTableCartItem[], // 选中的商品
  page: 1,
  pageSize: 100,
  pageSizes: [100, 200, 300],
  total: 401,
})

// 商品总金额
const countMoney = computed(() => {
  const money = defData.selectData.reduce((sum, item) => {
    return sum + item.goods_price * item.goods_num
  }, 0)

  return new Big(money).toFixed(2)
})

// 获取购物车商品
const { data: cartData } = await GoodsApi.getCartList()
// console.log('cartData :>> ', cartData)

// el-table多选事件
const handleSelectionChange = (val: GoodsTableCartItem[]) => {
  defData.selectData = val
}

// 删除
const onRemove = (row: GoodsTableCartItem) => {
  // 获取到在tableData对应的下标
  const index = defData.tableData.findIndex(item => item.goods_id === row.goods_id)
  // console.log('index :>> ', index)

  if (index >= 0) {
    // 调用删除接口

    // 删除
    defData.tableData.splice(index, 1)
  }
}

// 删除所选商品
const onRemoveChose = () => {
  const str = defData.selectData.map(item => item.goods_id).join(',')
  if (str) {
    // 调用接口
  } else {
    ElMessage.error('请选择商品')
  }
}

definePageMeta({
  layout: 'home',
  middleware: 'auth',
})
</script>

<style scoped lang="scss">
.table-cart {
  min-height: 500px;
  background-color: var(--el-color-white);
}

.table-cart-count {
  background-color: var(--el-color-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-top: 1px solid var(--el-border-color-lighter);
}
</style>
