<!-- 新增、修改退货 -->
<template>
    <!-- auto-height -->
    <CoDialog v-model:visible="defData.visible" :loading="defData.btnLoading" auto-height hidden :title="comData.title"
        width="800px" @close="onClose" @cancel="onClose" @confirm="onConfirm">
        <el-form ref="formRef" :model="form.data" :label-width="130" :rules="rules">
            <el-row v-if="defData.type === 1">
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item prop="order_no" label="订单编号:">
                        <b>{{ form.data.order_no }}</b>
                    </el-form-item>
                </el-col>
            </el-row>
            <div v-if="defData.type === 2" class="mb5px -mt10px">
                订单编号: <b>{{ form.data.order_no }}</b>
            </div>
            <el-table :data="defData.tableData" class="return-table mb15px" border
                @selection-change="handleSelectionChange">
                <el-table-column v-if="defData.type === 1" type="selection" width="50" align="center" />
                <el-table-column label="商品信息" min-width="160" property="goods_name">
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <CoImage class="h50px w50px" :src="row.goods_img" />
                            <div class="flex-1 pl8px">
                                <NuxtLink :to="`/goods/${row.goods_sn}`" target="_blank" class="goods-name">
                                    {{ row.goods_name }}
                                </NuxtLink>
                                <div class="text-12px">
                                    <span class="mr8px">价格：￥{{ row.meet_price }}</span>
                                    <span v-if="defData.type === 1">数量：{{ row.goods_number }}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="退换数量" width="150" property="return_number" align="center">
                    <template #default="{ row }">
                        <el-input-number v-if="defData.type === 1" v-model="row.return_number" :min="1"
                            :max="row.goods_number" class="w100%!" />
                        <span v-else>{{ row.goods_number }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="商品总金额" width="150" property="total" align="center">
                    <template #default="{ row }">
                        <!-- <el-input-number v-if="defData.type === 1" v-model="row.return_number" :min="1"
                            :max="row.goods_number" class="w100%!" /> -->
                        <span>
                            {{ formatNumber(row.return_number * row.meet_price) }}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <el-row v-if="defData.type === 1">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item prop="type" label="类型:">
                        <el-radio-group v-model="form.data.type">
                            <el-radio :label="1">
                                退货
                            </el-radio>
                            <el-radio :label="2">
                                换货
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item prop="describe" label="问题描述:">
                        <el-input v-model="form.data.describe" type="textarea" resize="none" :rows="3" maxlength="80"
                            clearable show-word-limit />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item prop="img" label="图片:">
                        <CoUpload v-model="form.data.img" />
                    </el-form-item>
                </el-col>
            </el-row>
            <template v-if="defData.type === 2">
                <div class="return-pane">
                    <div class="mb10px">
                        <span class="mr-5px">退换状态:</span>
                        <el-tag v-if="returnData.refund_status === 1" type="success" size="large">
                            已完成
                        </el-tag>
                        <el-tag v-else-if="returnData.refund_status === 2" type="info" size="large">
                            已取消
                        </el-tag>
                        <el-tag v-else type="" size="large">
                            申请中
                        </el-tag>
                    </div>
                    <div class="mb8px">
                        <span class="mr-5px">服务类型:</span>
                        <span class="mr-5px">{{ returnData.is_all ? '全部' : '部分' }}</span>
                        <el-tag v-if="returnData.type === 1" type="info" size="small">
                            退货
                        </el-tag>
                        <el-tag v-else type="warning" size="small">
                            换货
                        </el-tag>
                    </div>
                    <div class="mb8px">
                        <span class="mr-5px">问题描述:</span>
                        <span class="mr-5px inline-block min-w100px">{{ returnData.describe }}</span>
                    </div>
                    <div class="mb8px">
                        <span class="mr-5px">物流公司:</span>
                        <span class="mr-5px inline-block min-w100px">{{ returnData.logistics_cusmoer || '--' }}</span>
                        <span class="mr-5px">快递单号:</span>
                        <span class="mr-5px inline-block min-w100px">{{ returnData.logistics_no || '--' }}</span>
                    </div>
                    <div class="mb8px">
                        <span class="mr-5px">回复内容:</span>
                        <span class="mr-5px inline-block min-w100px">{{ returnData.reply || '--' }}</span>
                    </div>
                    <!-- <div class="mb8px">
                        <span class="mr-5px">回复内容:</span>
                        <span class="mr-5px inline-block min-w100px">{{ returnData.reply || '--' }}</span>
                        <span class="mr-5px">回复内容:</span>
                        <span class="mr-5px inline-block min-w100px">{{ returnData.reply || '--' }}</span>
                        <span class="mr-5px">回复内容:</span>
                        <span class="mr-5px inline-block min-w100px">{{ returnData.reply || '--' }}</span>
                    </div>
                    "total_price": "455.00", //订单总金额
                    "total_number": 2, //退货订单商品总数量
                    "meet_price": "455.00", //实付单价
                    "meet_money": "455.00", //最终退款金额 -->
                </div>
                <el-table :data="defData.billData.refund_log" size="small" border @selection-change="handleSelectionChange">
                    <el-table-column label="操作者" width="120" property="author" show-overflow-tooltip />
                    <el-table-column label="信息" min-width="160" property="content" show-overflow-tooltip />
                    <el-table-column label="时间" width="160" property="create_time" show-overflow-tooltip />
                    <!-- <el-table-column label="图片" width="80" property="img_url" align="center" show-overflow-tooltip>
                        <template #default="{ row }">
                            <CoImage :src="row.img_url" class="h40px w40px vertical-bottom" :icon-size="18" />
                        </template>
                    </el-table-column> -->
                </el-table>
            </template>
        </el-form>
    </CoDialog>
</template>

<script lang="ts" setup>
import { type FormInstance, type FormRules } from 'element-plus'
import { OrderReturnApi } from '~/api/goods/order'

const emits = defineEmits<{
    // (event: 'update'): void
    'update': []
}>()
const formRef = ref<FormInstance>()

const defData = reactive({
    visible: false, // 是否显示窗口，默认为false。
    ready: false, // 内容是否加载完成
    type: 1, // 1：新增，2：修改
    btnLoading: false,

    tableData: [] as OrderReturnApi_GetListResponse[],
    multipleSelect: [] as OrderReturnApi_GetListResponse[], //

    billData: {} as OrderReturnApi_InfoResponse,
})

// 表单数据
const form = reactive({
    data: {
        id: 0, // 地址id
        type: '' as '' | 1 | 2, // 类型 1退货 2换货
        describe: '', // 描述
        img: '', // 图片地址
        order_no: '', // 订单编号
    },

})
const rules = reactive<FormRules>({
    name: [
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    type: [
        { required: true, message: '请选择退换类型', trigger: 'blur' },
    ],
    describe: [
        { required: true, message: '请输入问题描述', trigger: 'blur' },
    ],
    img: [
        // { required: true, message: '必填项不能为空', trigger: 'blur' },
    ],
})

const comData = computed(() => {
    let dat = {
        title: '新增退换货',
    }
    if (defData.type === 2) {
        dat = {
            title: '退换货信息',
        }
    }
    return dat
})

const returnData = computed(() => defData.billData.refund_info)

// 获取初始信息
const initDefaultData = async () => {
    if (defData.ready) return false

    defData.ready = true
}

const initTableData = async () => {
    const main_order_no = form.data.order_no
    if (!main_order_no) return ElMessage.error('请先输入订单编号')
    const { data: res } = await OrderReturnApi.getList({ main_order_no })

    if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)

    defData.tableData = res.value.data.map((item) => {
        return {
            ...item,
            return_number: item.goods_number,
        }
    })
}

// table多选
const handleSelectionChange = (val: OrderReturnApi_GetListResponse[]) => {
    defData.multipleSelect = val
}

// 打开弹窗
const onOpenDialog = async (params: OrderReturnOpen) => {
    if (params.order_no) { // 添加退货
        defData.type = 1
        form.data.order_no = params.order_no.trim() ?? '' // 订单编号不能为空或重复的情况
        if (!form.data.order_no) return
        await initTableData()
        defData.visible = true
    } else if (params.row) { // 查看退货信息
        defData.type = 2

        form.data.order_no = params.row.main_order_no

        const { data: res, error } = await OrderReturnApi.info({ refund_no: params.row.refund_no })
        if (error.value) return ElMessage.error(error.value)
        if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
        // console.log('res.value.data :>> ', res.value.data)
        const resData = res.value.data
        defData.billData = resData
        defData.tableData = resData.goods_list.map((item) => {
            const opt: OrderReturnApi_GetListResponse = {
                return_number: item.goods_number,
                id: item.id,
                goods_id: item.goods_id,
                goods_number: item.goods_number,
                meet_price: item.meet_price,
                goods_name: item.goods_name,
                goods_img: item.goods_img,
                goods_sn: item.goods_sn,
                // TODO 这两编号有使用就要改正确的
                main_order_no: form.data.order_no,
                order_no: '',
            }
            return opt
        })

        defData.visible = true
    }
}
// 关闭弹窗
const onClose = () => {
    defData.visible = false
    formRef.value?.resetFields()
}

// 确认
const onConfirm = async () => {
    if (defData.type === 1) { //  新增
        if (!defData.multipleSelect.length) return ElMessage.error('请先选择需要退换的商品')

        const isRun = await useFormVerify(formRef.value)
        if (!isRun) return false

        // [{"id":1,"goods_id":1,"goods_number":2,'main_order_no':M20230412102104894540,"order_no": "C20230412102104404443"}]
        const goodsArr = defData.multipleSelect.map((item) => {
            return {
                id: item.id,
                goods_id: item.goods_id,
                goods_number: item.return_number,
                main_order_no: item.main_order_no,
                order_no: item.order_no,
            }
        })

        const params: OrderReturnApi_Add = {
            goods_info: JSON.stringify(goodsArr),
            type: form.data.type as 1 | 2,
            describe: form.data.describe?.trim() ?? '',
            main_order_no: form.data.order_no,
            img_url: form.data.img,
        }

        defData.btnLoading = true
        const { data } = await OrderReturnApi.add(params)
        defData.btnLoading = false
        // console.log('data :>> ', data)
        if (data.value?.code === 200) {
            ElMessage.success('添加成功')
            emits('update') // 更新列表
            onClose()
        } else {
            ElMessage.error(data.value?.msg)
        }
    } else if (defData.type === 2) { // 修改
        onClose()
    }
}

defineExpose({
    onOpenDialog,
})
</script>

<style lang="scss" scoped>
.return-table {
    .goods-name {
        font-weight: bold;

        &:hover {
            color: var(--el-color-primary);
        }
    }
}

.return-pane {
    margin: 15px 0;
    padding: 15px;
    border-radius: 5px;
    background-color: var(--el-fill-color-light);
}
</style>
