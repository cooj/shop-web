
/**
 * 获取购物车结算商品 - 请求参数
 */
declare interface OrderApi_GetSettleCart {
  cart_id: number;  //  购物车列表ID
  address_id?: number;    // 地址ID (用于算出运费)
}

/**
 * 获取结算商品 - 请求参数
 */
declare interface OrderApi_GetSettleGoods {
  goods_id: number; // 商品ID 
  goods_number: number; // 商品数量
  address_id?: number;    // 地址ID (用于算出运费)
}



/**
 * 获取结算商品 - 响应数据
 */
declare interface OrderApi_GetSettleResponse {
  "goods_list": {
    "goods_id": 1, //商品ID
    "goods_name": "红钐 按键寿命试验机 HSL-TA4 四工位", //商品名称
    "goods_code": "HSL-TA4",
    "shop_price": "200.00",
    "goods_img": "", //商品图片
    "goods_weight": "0.00",
    "unit": "台",
    "peas_num": 0,
    "peas_amount": "0",
    "stock": 8,
    "warn_number": 1,
    "goods_number": "2", //商品数量
    "id": 0, //记录ID
    "price": 192 //商品价格
  }[],
  "number": 2, //数量
  "total_price": 3624.96, //订单总金额
  "total_peas": 36, //该订单可用工游豆
  "user_peas": 2330, //当前用户工游豆
  "freight_price": 0, //运费
  "coupon_list": {
    "id": 1, //记录ID
    "coupon_id": 11,
    "user_id": 1, //用户ID
    "is_status": 1,
    "add_time": 1680052037, //添加时间
    "start_time": "2023-03-29",
    "end_time": "2023-03-30",
    "is_use": 0,
    "coupon_draw_id": 1, //优惠券id（无传0）
    "coupon_name": "双十一优惠",
    "type": 2, //类型 1退货 2换货
    "par_value": "200.00",
    "is_threshold": 0,
    "lowest": 0,
    "goods_cat_id": 3,
    "cat_name": "按键寿命试验机"
  }[] //优惠券
}



/**
 * 提交订单 - 请求参数
 */
declare interface OrderApi_ConfirmSettle {
  is_peas: number;     // 是否使用工游豆 1是 0否      示例值:0
  goods_peas: number;     // 工游豆数量      示例值:0
  address_id: number;     // 地址ID      示例值:5
  coupon_draw_id: number;     // 优惠券id（无传0）      示例值:0
  remarks: string;     // 备注      示例值:测试平摊金额
  bill_status: number;     // 是否开票 0否 1是  以下字段=1是填      示例值:0
  type: string;     // 发票类型 1：增值税专用发票，2：普通发票      示例值:
  header: string;     // 抬头      示例值:
  tax_no: string;     // 税号      示例值:
  bill_name: string;     // 发票人姓名  type=2填      示例值:
  bill_tel: string;     // 发票人电话  type=2填      示例值:
  logon_tel: string;     // 注册电话  type=2填      示例值:
  identifier: string;     // 纳税人识别号  type=2填      示例值:
  bank: string;     // 开户银行  type=2填      示例值:
  bank_account: string;     // 开户账号  type=2填      示例值:
  zip_code: string;     // 邮编  type=2填      示例值:
  address: string;     // 地址  type=2填      示例值:
}



/**
 * 提交订单 - 响应数据
 */
declare interface OrderApi_ConfirmSettleResponse {
  "main_order_no": "M20230419141058256483", //主订单号
  "meet_price": 0, //应付金额
  "status": 0 //是否需要支付 1是 0否
}