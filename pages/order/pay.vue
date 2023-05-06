<template>
  <section>
    <div class="container">
      <template v-if="defData.ready">
        <el-breadcrumb class="py15px">
          <el-breadcrumb-item :to="{ path: '/' }">
            首页
          </el-breadcrumb-item>
          <!-- <el-breadcrumb-item :to="{ path: '/order/cart' }">
          购物车
        </el-breadcrumb-item> -->
          <el-breadcrumb-item>
            订单支付
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="mb20px bg-#fff p15px">
          <el-result v-if="defData.status === 0" icon="info" title="订单提交成功" sub-title="立即支付完成订单">
            <template #extra>
              <div class="radio-box mb20px">
                <el-radio-group v-model="form.payType">
                  <div class="radio-item">
                    <el-radio :label="1" border>
                      <i class="i-ic-baseline-wechat mr3px inline-block v-text-top c-#09bb07" />
                      微信
                    </el-radio>
                  </div>
                  <div class="radio-item">
                    <el-radio :label="2" border>
                      <i class="i-ic-baseline-payment mr3px inline-block v-text-top c-#3887ff" />
                      支付宝
                    </el-radio>
                  </div>
                  <div class="radio-item">
                    <el-radio :label="3" border>
                      <!-- <span class="ml3px"> -->
                      <i class="i-ic-twotone-payments mr3px inline-block v-text-top c-#ff5335" />
                      线下转账
                      <!-- </span> -->
                    </el-radio>
                  </div>
                </el-radio-group>
              </div>
              <el-button type="primary" @click="onPayment">
                立即支付
              </el-button>
            </template>
          </el-result>
          <el-result v-else-if="defData.status === 1" icon="success" title="订单支付完成" sub-title="">
            <template #extra>
              <NuxtLink to="/">
                <el-button type="primary">
                  返回首页
                </el-button>
              </NuxtLink>
              <NuxtLink to="/order/list">
                <el-button class="ml15px" type="primary" plain>
                  我的订单
                </el-button>
              </NuxtLink>
            </template>
          </el-result>
        </div>
      </template>
      <div v-else class="my15px b-#eee bg-#fff">
        <BaseError />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { OrderApi } from '~/api/goods/order'

const route = useRoute()
const defData = reactive({
  ready: true,
  status: 0, // 支付状态 0未支付 1已支付 2已取消 3已退款
  order_no: '',
})

const form = reactive({
  payType: '' as '' | 1 | 2 | 3,
})

const order_no = route.query.order_no as string // 订单编号

// if (!order_no) defData.ready = false
const initDefaultData = async () => {
  if (!order_no) return defData.ready = false
  const { data: res } = await OrderApi.getInfo({ main_order_no: order_no })
  await wait(500)
  console.log('res :>> ', res)
  if (res.value?.code === 200) {
    defData.order_no = order_no
    defData.status = res.value.data.pay_status
  } else {
    ElMessage.error(res.value?.msg)
    return defData.ready = false
  }
}

// 支付
const onPayment = async () => {
  if (!form.payType) return ElMessage.error('请选择支付方式')// 验证选择的支付方式是否选择了支付方式


  const { data: res } = await OrderApi.payOrder({ main_order_no: defData.order_no, pay_type: form.payType })
  console.log('res :>> ', res);
  if (res.value?.code === 200) {
    if (form.payType === 3) defData.status = 1
  }

}

initDefaultData()
definePageMeta({
  layout: 'home',
  middleware: 'auth',
})
</script>

<style lang="scss" scoped>
.radio-box {
  :deep(.el-radio__input) {
    display: none;
  }

  // :deep(.el-radio__label) {
  //   padding-left: 0;
  // }
  .radio-item {
    width: 150px;
    text-align: center;
  }
}
</style>
