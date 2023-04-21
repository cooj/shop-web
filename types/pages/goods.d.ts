

/**
 * 获取商品分类 - 响应数据
 */
declare interface GoodsApi_GetClassResponse extends GoodsApi_GetClass {

}

interface GoodsApi_GetClass {
  "cat_id": number,   // 分类id     46
  "pid": number,    // 上级分类id   0
  "cat_code": "",
  "cat_name": string,   //  行业专用仪器
  "sort": 0,
  "pid_arr": number[],
  "children": GoodsApi_GetClass[]
}


/**
 * 获取购物车商品列表 - 响应数据
 */
declare interface GoodsApi_GetCartListResponse {
  "goods_list": {
    "id": 4, //记录ID
    "user_id": 1, //用户ID
    "goods_id": 3, //商品id
    "goods_number": 4, //数量
    "create_time": "2023-03-30 14:17:36", //添加时间
    "goods_name": "红钐 按键寿命试验机 HSL-TA3 三工位", //商品名称
    "goods_code": "HSL-TA3", //商品型号
    "shop_price": "0.00", //原价
    "goods_img": "https://goyojo.oss-cn-shenzhen.aliyuncs.com/20230104/202301041419308274.jpg?x-oss-process=image/quality,Q_50", //商品图片
    "goods_weight": "0.00", //商品重量
    "unit": "台" //单位
  }[]
}

























// 页面 ///////////////////////////////////////////////////////
/**
 * 商品页面参数
 */
declare interface GoodsListParams {
  query: GoodsListParamsQuery;   // 参数
  relate?: boolean;    // 是否携带浏览器地址上的参数
  url?: boolean;   // 返回地址的形式
}

declare interface GoodsListParamsQuery {
  keyword?: string; // 关键字
  cid?: string | number;   // 商品分类id   类别
  bid?: string | number;   // 商品品牌id
}
