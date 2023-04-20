<template>
  <div>
    <div h40px>
      <el-breadcrumb>
        <el-breadcrumb-item>
          订单中心
        </el-breadcrumb-item>
        <el-breadcrumb-item>我的优惠券</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div style="margin:0 0 20px;font-size: large;">
        我的优惠券
      </div>
      <el-space wrap>
        <el-card
          v-for="item in defData.MyCouponList" :key="item.coupon_id" class="box-card" shadow="hover"
          :data="defData"
        >
          <i class="i-ep-close inline-block" style="float: right;margin: 5px;" @click="delClick(item.coupon_id)" />
          <div style="font-size: xx-large;font-weight: bold;">
            ￥{{ item.par_value }}
          </div>
          <div style="font-size: 14px;">
            活动： {{ item.coupon_name }}
          </div>
          <div style="font-size: 14px;">
            有效期：{{ item.start_time }}至{{ item.end_time }}
          </div>
          <div v-if="item.is_status === 0">
            <el-button type="danger" plain>
              未使用
            </el-button>
          </div>
          <div v-else>
            <el-button type="info" plain>
              已使用
            </el-button>
          </div>

          <!-- <el-button key="plain">
            删除
          </el-button> -->
        </el-card>
      </el-space>
      <div style="margin:20px 0px;font-size: large;">
        优惠券中心
      </div>
      <el-space wrap>
        <el-card v-for="item in defData.CouponList" :key="item.coupon_id" class="box-card" :data="defData" shadow="hover">
          <!-- <div class="card-content"> -->
          <div style="font-size: xx-large;font-weight: bold;">
            ￥{{ item.par_value }}
          </div>
          <div style="font-size: 14px;">
            活动： {{ item.coupon_name }}
          </div>
          <div style="font-size: 14px;">
            有效期：{{ item.term_time }}
          </div>
          <div v-if="item.use_coupon === 0">
            <el-button type="danger" plain @click="onReceive(item.coupon_id)">
              去领取
            </el-button>
          </div>
          <div v-else>
            <el-button type="info" plain>
              已领取
            </el-button>
          </div>
        </el-card>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CouponApi } from '~/api/user/coupon'

const userState = useUserStore()

const defData = reactive({
  MyCouponList: [] as CouponApi_getListResponse['lists'],
  CouponList: [] as CouponApi_allListResponse[],
  use_coupon: '',
  user_id: '' as number | '',
  token: '',
})

// 初始化数据 我的优惠券
const initCardData = async () => {
  const a = userState.token
  const res = await CouponApi.geList({ token: a })
  if (res.data.value?.code !== 200) return ElMessage.error(res.data.value?.msg)
  defData.MyCouponList = res.data.value.data.lists
}
initCardData()

// 展示所有优惠券
const showCoupon = async () => {
  const a = userState.token
  const res = await CouponApi.allList({ token: a })
  if (res.data.value?.code !== 200) return ElMessage.error(res.data.value?.msg)
  defData.CouponList = res.data.value.data
}
showCoupon()

// 领取
const onReceive = async (row: any) => {
  const user = await userState.getUserInfo()
  if (user.value) {
    defData.user_id = user.value.user_id
  }
  const a = userState.token
  const data: CouponApi_addList = {
    user_id: defData.user_id as number,
    coupon_id: row,
    token: a,
  }
  const res = await CouponApi.addList(data)
  if (res.data.value?.code !== 200) return ElMessage.error(res.data.value?.msg)
  ElMessage.success('领取成功')
  initCardData()
  showCoupon()
}

// 删除
const delClick = async (row: any) => {
  const a = userState.token
  ElMessageBox.confirm('此操作将永久删除该条内容，是否继续?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    buttonSize: 'default',
  }).then(async () => {
    const res = await CouponApi.delList({
      id: row,
      token: a,
    })
    if (res.data.value?.code !== 200) {
      ElMessage.error(res.data.value?.msg)
      return false
    }
    ElMessage.success('删除成功')
    initCardData()
    showCoupon()
  }).catch(() => { })
}

definePageMeta({
  layout: 'user',
  middleware: 'auth',
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 280px;
  height: 150px;
  color: var(--el-color-primary);
}
</style>
