/**
 * 抬头管理Api
 */
export const UserInvoiceApi = {

    /**
     * 发票 - 列表
     * @returns
     */
    getList: () => useHttp<UserInvoiceApi_getList[]>('/api/mall_user/bill_lists', '', { method: 'get' }),

    /**
     * 发票 - 新增
     * @returns
     */
    add: (data: UserInvoiceApi_Add) => useHttp('/api/mall_user/add_bill', data, { method: 'post' }),
}
