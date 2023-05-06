<!-- 订单列表 -->
<template>
  <div>
    <BaseFormTool :data="searchData" inline @submit.prevent="onSearch">
      <template #pay_type="{ row }">
        <el-select v-model="row.pay_type" filterable clearable placeholder="">
          <el-option v-for="(item, index) in defData.payList" :key="index" :label="item" :value="index" />
        </el-select>
      </template>
      <template #status="{ row }">
        <el-select v-model="row.status" filterable clearable placeholder="">
          <el-option v-for="(item, index) in defData.stateList" :key="index" :label="item" :value="index" />
        </el-select>
      </template>
    </BaseFormTool>
    <el-table>
      <el-table-column align="center" label="序号" width="90"> </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">

const defData = reactive({
  payList: { // 支付类型 1微信 2支付宝 3线下
    "1": "微信", "2": "支付宝", "3": "线下" 	// 默认为 Line 支付类型的支
  },
  stateList: {  //0全部 1待支付 2待发货 3待确认 4已取消
    "0": "全部", "1": "待支付", "2": "待发货", "3": "待确认", "4": "已取消"
  }
})

// form表单数据类型
interface FormSearchData {
  order_no: ''
  pay_type: '' | number
  consignee_name: ''
  status: ''
}

const searchData = reactive<BaseFormToolType<FormSearchData>>({
  data: {
    order_no: '',
    pay_type: '',
    consignee_name: '',
    status: '',
  },
  config: [
    { itemProp: { label: '订单编号', prop: 'order_no' }, placeholder: '请输入订单编号', width: '180' },
    { itemProp: { label: '收件人', prop: 'consignee_name' }, placeholder: '请输入收件人名称', width: '160' },
    { itemProp: { label: '支付类型', prop: 'pay_type' }, slot: true, placeholder: '', width: '120' },
    { itemProp: { label: '状态', prop: 'status' }, slot: true, placeholder: '', width: '130' },
  ],
  hideBtn: false,
  // showAll: true,
  searchFunc: () => initTableData(),
})

const initTableData = () => {
  console.log(searchData.data)
}

const onSearch = () => {
  initTableData()
}

definePageMeta({
  layout: 'user',
  middleware: 'auth',
})
</script>

<style  lang="scss" scoped></style>
