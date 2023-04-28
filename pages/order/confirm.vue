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
      <el-form :model="form">
        <section class="sec-box">
          <div class="tle">
            <b>收货地址</b>
            <el-button text bg size="small" @click="onAddress">
              新增地址
            </el-button>
          </div>
          <el-form-item prop="address">
            <el-radio-group v-if="!defData.addressList.length" v-model="form.address_id" class="address-radio">
              <el-radio v-for="item in defData.addressList" :key="item.address_id" :label="item.address_id">
                <span>{{ setAddressText(item) }}</span>
                <span class="mx5px opacity90">（{{ item.contacts }} 收）</span>
                <span class="mx5px">{{ item.phone }}</span>
                <em v-if="item.is_default" class="mx5px fw400 opacity70">默认地址</em>
              </el-radio>

              <el-radio :label="6">
                Option B
              </el-radio>
              <el-radio :label="9">
                Option C
              </el-radio>
            </el-radio-group>
            <div v-else class="w100% text-center text-13px c-#666">
              暂无收货地址,请点击
              <span class="cursor-pointer hover:c-#d7231e" @click="onAddress">新增地址</span>
            </div>
          </el-form-item>
        </section>
        <section class="sec-box">
          <div class="tle">
            <b>发票信息</b>
            <el-button text bg size="small">
              新增地址
            </el-button>
          </div>
          <el-form-item prop="address">
            <el-radio-group v-if="!defData.addressList.length" v-model="form.address_id" class="address-radio">
              <el-radio v-for="item in defData.addressList" :key="item.address_id" :label="item.address_id">
                <span>{{ setAddressText(item) }}</span>
                <span class="mx5px opacity90">（{{ item.contacts }} 收）</span>
                <span class="mx5px">{{ item.phone }}</span>
                <em v-if="item.is_default" class="mx5px fw400 opacity70">默认地址</em>
              </el-radio>

              <el-radio :label="6">
                Option B
              </el-radio>
              <el-radio :label="9">
                Option C
              </el-radio>
            </el-radio-group>
            <div v-else class="w100% text-center text-13px c-#666">
              暂无收货地址,请点击
              <span class="cursor-pointer hover:c-#d7231e" @click="onAddress">新增地址</span>
            </div>
          </el-form-item>
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
    <UserAddressModel ref="modelRef" @update="getAddress" />
  </section>
</template>

<script lang="ts" setup>
import { UserAddressApi } from '~/api/user/address'
import UserAddressModel from '~/components/user/UserAddressModel.vue'

const modelRef = ref<InstanceType<typeof UserAddressModel>>()

const defData = reactive({
  type: 1, // 添加收货地址使用 1：收货地址 2：发票地址
  addressList: [] as UserAddressApi_GetListResponse[], // 用户地址列表
  billAddressList: [] as UserAddressApi_GetListResponse[], // 用户地址列表
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
  address_id: '' as '' | number, // 地址id
})

const initDefaultData = async () => {
  const [res1] = await Promise.all([
    UserAddressApi.getList(), // 获取所有地址列表

  ])
  await wait(500)
  // console.log('res1 :>> ', res1)
  if (res1.data.value?.code === 200) {
    defData.addressList = res1.data.value.data
  }
}

// 地址信息拼接
const setAddressText = (row: UserAddressApi_GetListResponse) => {
  const arr: string[] = [] // 保存地址列表的字符串数组 或 字符串 或 数组
  if (row.province) arr.push(row.province) // 省份 名称 或 省份id 或 省份名称id 或
  if (row.city) arr.push(row.city)
  if (row.area) arr.push(row.area) //
  if (row.address) arr.push(row.address) //

  return arr.join('  ')
}
/**
 * 新增地址
 * @param type 1：收货地址 2：发票地址
 */
const onAddress = (type: 1 | 2) => {
  defData.type = type
  modelRef.value?.onOpenDialog()
}
// 获取地址
const getAddress = (params: UserAddressApi_Edit) => {
  if (defData.type === 1) {
    form.address_id = params.address_id
    const data = {
      ...params,
      user_id: 0,
    }
    defData.addressList.unshift(data)
    defData.billAddressList.push(data)
  }
}

onBeforeMount(() => {
  initDefaultData()
})

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

.address-radio {
  display: flex;
  width: 100%;

  .el-radio {
    width: 100%;
    padding: 0 10px;
    border: 1px solid transparent;
    margin: 0;

    &:hover {
      background-color: var(--el-color-danger-light-9);
    }

    &.is-checked {
      font-weight: bold;
      border-color: var(--el-color-danger-light-7);
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
