<!-- 订单确认 -->
<template>
  <section class="text-14px">
    <div class="container">
      <el-breadcrumb class="py15px">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: '/order/cart' }">
          购物车
        </el-breadcrumb-item> -->
        <el-breadcrumb-item>
          订单结算
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-form>
        <section class="sec-box">
          <div class="tle">
            <b>收货地址</b>
            <el-button text bg size="small" @click="onAddress">
              新增地址
            </el-button>
          </div>
        </section>
        <section class="sec-box">
          <div class="tle">
            <b>发票信息</b>
            <el-button text bg size="small">
              新增地址
            </el-button>
          </div>
        </section>
        <section class="sec-box">
          <div class="tle">
            <b>商品列表</b>
          </div>
          <el-table :data="form.tableData">
            <el-table-column prop="goods_name" label="商品名称" min-width="180">
              <template #default="{ row }">
                <div class="h50px flex">
                  <div class="goods_img">
                    <BaseImage class="h50px w50px" :src="row.goods_img" />
                  </div>
                  <div class="pl10px">
                    <NuxtLink class="goods_link">
                      {{ row.goods_name }}
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="goods_code" label="商品型号" width="160" />
            <el-table-column prop="goods_spec" label="商品规格" width="160" />
            <el-table-column prop="shop_price" label="价格" width="120" align="center" />
            <el-table-column prop="goods_number" label="商品数量" width="150" align="center">
              <template #default="{ row }">
                <!-- <b>{{ row.goods_number }}</b> -->
                <el-input-number v-model="row.goods_number" class="w100%!" :precision="0" :min="0" :max="100" />
              </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="100" align="center">
              <template #default="{ row }">
                <el-button type="primary" link @click="onRemove(row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <section class="sec-box">
          <div class="tle">
            <b>支付方式</b>
            <el-button text bg size="small">
              新增地址
            </el-button>
          </div>
          <div>
            <el-radio-group v-model="form.payType">
              <el-radio :label="1" border>
                在线支付
              </el-radio>
              <el-radio :label="2" border>
                对公转账
              </el-radio>
            </el-radio-group>
          </div>
          <div class="mt10px inline-flex items-center">
            <span class="inline-flex items-center">
              支持
              <i class="i-ic-baseline-wechat mr3px c-#09bb07" />
              微信
            </span>
            <span class="ml3px inline-flex items-center">
              <i class="i-ic-baseline-payment mr3px c-#3887ff" />
              在线支付
            </span>
            <span class="ml3px inline-flex items-center">
              <i class="i-ic-twotone-payments mr3px c-#ff5335" />
              线下转账
            </span>
          </div>
        </section>
        <section class="sec-box flex mb0!">
          <div class="flex-1">
            <div class="tle">
              <b>优惠方式</b>
            </div>
          </div>
          <ul class="prefer-ul w300px">
            <li>
              <span class="item-title">商品总件数：</span><span class="item-text">3件</span>
            </li>
            <li>
              <span class="item-title">含危险品：</span><span class="item-text">0件</span>
            </li>
            <li>
              <span class="item-title">商品含税总额：</span><span class="item-text">￥266.70</span>
            </li>
            <li>
              <span class="item-title">税额：</span><span class="item-text">￥30.68</span>
            </li>
            <li>
              <span class="item-title freight-item-wrap">运费<i class="freight-detail-txt">(明细)</i>：</span><span
                class="item-text"
              >￥8.00</span>
            </li>
            <li>
              <span class="item-title">运费减免：</span><span class="item-text">-￥0.00</span>
            </li>
          </ul>
        </section>
        <section class="sec-box flex items-center justify-end b-t b-t-#eee">
          <b class="mr30px">实付款：<span class="main-color text-24px">¥19.90</span></b>
          <el-button type="primary" class="min-w150px" size="large">
            <b>提交订单</b>
          </el-button>
        </section>
      </el-form>
    </div>
    <UserAddressModel ref="modelRef" />
  </section>
</template>

<script lang="ts" setup>
import UserAddressModel from '~/components/user/UserAddressModel.vue'

const modelRef = ref<InstanceType<typeof UserAddressModel>>()

const defData = reactive({

})

const form = reactive({
  tableData: [{
    id: 22,
    user_id: 57,
    goods_id: 12,
    goods_number: 5,
    create_time: '2023-04-27 14:50:06',
    goods_name: '济南辰驰 密封性能试验仪 MFY-01B',
    goods_code: 'MFY-01B',
    shop_price: '0.00',
    goods_img: '',
    goods_weight: '0.00',
    unit: '台',
    peas_num: 0,
    peas_amount: '0',
    stock: 10,
    warn_number: 1,
  }],
  payType: 1, // 支付方式 1-在线，  2：对公转账
})

const onAddress = () => {
  modelRef.value?.onOpenDialog()
}

definePageMeta({
  layout: 'home',
  middleware: 'auth',
})
</script>

<style lang="scss" scoped>
.sec-box {
  background: var(--el-color-white);
  padding: 15px;
  margin-bottom: 20px;

  .tle {
    font-size: 15px;
    margin-bottom: 10px;

    b {
      margin-right: 8px;
    }
  }

}

.prefer-ul {
  font-size: 12px;
  text-align: right;
  color: #333;
  line-height: 2;

  .item-text {
    display: inline-block;
    min-width: 90px;
    color: var(--el-color-primary);
  }
}
</style>
