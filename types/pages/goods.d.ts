

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
