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
    <BaseTablePage v-model:page="tableData.pagination" class="table-box" v-model:table-header="tableData.tableHeader"
      scrollbar-always-on :data="tableData.data" auto-height :span-method="arraySpanMethod" border
      @update:page="onHandleCurrentChange">
      <template #order_info="{ scopes }">
        <div v-if="scopes.row.index">订单编号：{{ scopes.row.order_info.main_order_no }}
          下单时间：{{ scopes.row.order_info.cerate_time }}</div>
        <ul v-else class="goods-list">
          <li v-for="item in scopes.row.order_info.goods_info" :key="item.goods_id">
            <BaseImage class="w55px h55px" :src="item.goods_img" />
            <!-- <el-image class="w55px h55px"
              src="https://private.zkh.com/PRODUCT/BIG/BIG_AA4478338_01.jpeg?x-oss-process=style/webp_nowatermark_350&timestamp=1672388932000"></el-image> -->
            <div class="text">
              <h3 class="tle">
                <NuxtLink :to="`/goods/detail-${item.goods_id}`">{{ item.goods_name }}</NuxtLink>
              </h3>
              <div class="pce text-12px c-#888"> 价格：<span class="mr5px">￥{{ item.price }}</span>
                数量：<span>{{ item.goods_number }}</span>
              </div>
            </div>
          </li>
        </ul>
      </template>
      <template #order_mount="{ scopes }">
        <div v-if="scopes.row.index"></div>
        <div v-else class="goods-amount">
          <!-- <p>总金额：{{ scopes.row.order_info.total_price }}</p>
          <p>优惠金额：{{ scopes.row.order_info.coupon_price }}</p>
          <p>实付金额(含运费)：¥{{ scopes.row.order_info.meet_price }}</p> -->
          ￥{{ scopes.row.order_info.meet_price }}
          <br>
          <span class="c-#888 text-12px">(含运费：0.00)</span>
        </div>
      </template>
      <template #consignee_info="{ scopes }">
        <div v-if="scopes.row.index"></div>
        <div v-else>
          <p>
            <span class="mr5px">{{ scopes.row.order_info.consignee_name }}</span>
            <span>{{ scopes.row.order_info.consignee_phone }}</span>
          </p>
          <p>{{ setAddressText(scopes.row.order_info) }}</p>
        </div>
      </template>
      <template #status="{ scopes }">
        <div v-if="scopes.row.index"></div>
        <div v-else>
          <el-tag v-if="scopes.row.status === 0" type="warning">待支付</el-tag>
          <el-tag v-else-if="scopes.row.status === 1" type="primary">待发货</el-tag>
          <el-tag v-if="scopes.row.status === 2" type="info">已取消</el-tag>
          <el-tag v-if="scopes.row.status === 3" type="danger">已退款</el-tag>
        </div>
      </template>

      <template #operate="{ scopes }">
        <template v-if="!scopes.row.index">
          <el-button link type="primary" size="small">查看详情</el-button>
          <br>
          <el-button link type="primary" size="small">备注</el-button></template>

      </template>
    </BaseTablePage>
  </div>
</template>

<script setup lang="ts">
import { TableColumnCtx } from 'element-plus'
import { OrderApi } from '~/api/goods/order'


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

type TableDataItem = OrderListTableData;
const tableData = reactive<BaseTableDataType<TableDataItem>>({
  data: [],
  tableHeader: [
    // { property: '', label: '', type: "selection", width: 38, },
    // { property: 'goods_img', label: '图片', width: 60, align: "center", slot: true },
    { property: 'order_info', label: '订单信息', minWidth: 200, slot: true, className: 'goods-list-row', showOverflowTooltip: false },
    { property: 'order_mount', label: '订单金额', width: 150, align: "right", slot: true, showOverflowTooltip: false },
    { property: 'consignee_info', label: '收货信息', minWidth: 150, slot: true, showOverflowTooltip: false },
    { property: 'status', label: '订单状态', width: 100, slot: true, align: 'center' },
    { property: 'operate', label: '操作', width: 85, slot: true, align: 'center', showOverflowTooltip: false },
    // { property: 'market_price', label: '市场价', width: 85, align: 'center' },
  ],
  pagination: {
    ...PAGINATION,
    // total: 0,
  },
})


const initTableData = async () => {
  let params: OrderApi_GetOrderList = {
    status: Number(searchData.data.status),
    main_order_no: searchData.data.order_no,
    pay_type: Number(searchData.data.pay_type),
    consignee_name: searchData.data.consignee_name,
    start_time: '',
    end_time: ''
  }
  const { data: res } = await OrderApi.getOrderList(params);
  await wait(500)
  if (res.value?.code === 200) {
    let list: OrderListTableData[] = []
    res.value.data.lists.forEach((item, index) => {
      let obj: OrderListTableData = {
        index: index + 1, // 序列号
        order_info: item, // 订单信息（下单时间排序）	
        order_mount: Number(item.meet_price),//订单金额	
        consignee_info: item.consignee_name, //收货人信息	
        // 物流/支付信息	
        status: item.status, // 订单状态	
      }
      let obj2: OrderListTableData = {
        ...obj,
        index: 0
      }
      list.push(...[obj, obj2])
    });
    tableData.data = list
    tableData.pagination.total = res.value.data.total;//总条数 记录数大于10条记录不
  }
  console.log('res :>> ', res);
}

// table合并行
interface SpanMethodProps {
  row: OrderListTableData
  column: TableColumnCtx<OrderListTableData>
  rowIndex: number
  columnIndex: number
}

const arraySpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (row.index) {
    if (columnIndex === 0) {
      return [1, 5]
    }
    // else if (columnIndex === 1) {
    //   return [0, 0]
    // }
    // return [1, 3]
  }
  // console.log('row :>> ', row);
  // if (rowIndex % 2 === 0) {
  //   if (columnIndex === 0) {
  //     return [1, 2]
  //   } else if (columnIndex === 1) {
  //     return [0, 0]
  //   }
  // }
}

const setAddressText = (row: OrderApi_GetOrderListItem) => {
  return strJoin([row.province, row.city, row.area, row.address], '  ')
}

const onSearch = () => {
  initTableData()
}

const onHandleCurrentChange = () => {
  initTableData()
}


initTableData()
definePageMeta({
  layout: 'user',
  middleware: 'auth',
})
</script>

<style  lang="scss" scoped>
.table-box {
  :deep(.el-table) {
    font-size: 13px;
    --el-table-row-hover-bg-color: var(--el-color-white);
  }

  :deep(.el-table__body) {

    .goods-list-row:has(.goods-list) {
      padding: 0;

      .cell {
        padding: 0;
      }
    }
  }
}

.goods-list {
  li {
    display: flex;
    padding: 8px 12px;

    &+li {
      border-top: 1px;
    }

    .text {
      flex: 1;
      padding-left: 10px;

      .tle {
        line-height: 22px;
        max-height: 44px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        /* 需要显示的行数 */
        overflow: hidden;
        word-break: break-all;

        /* 强制英文单词断行 */
        a {
          color: #333;

          &:hover {
            color: var(--el-color-primary);
          }
        }

      }
    }
  }
}
</style>
