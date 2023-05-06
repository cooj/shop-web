

/**
 * 获取商品分类 - 响应数据
 */
declare interface GoodsApi_GetClassResponse {

  "id": number,   // id 2
  "cat_ids": string,    // 商品分类id列表或逗号分隔的字符串  "1271,1275"

  "custom_name": string,   // 名称 "设备1/设备2"
  "icon": string,   // "iconfont icon-home_00"
  "sort": number,   // 1
  "is_show": 0 | 1,   // 1
  "lists": GoodsApi_GetClass[]

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
    "goods_number": number, //数量    4
    "create_time": "2023-03-30 14:17:36", //添加时间
    "goods_name": "红钐 按键寿命试验机 HSL-TA3 三工位", //商品名称
    "goods_code": "HSL-TA3", //商品型号
    "shop_price": "0.00", //原价
    "goods_img": "https://goyojo.oss-cn-shenzhen.aliyuncs.com/20230104/202301041419308274.jpg?x-oss-process=image/quality,Q_50", //商品图片
    "goods_weight": "0.00", //商品重量
    "unit": "台" //单位
  }[]
}

/**
 * 商品详情 - 响应数据
 */
declare interface GoodsApi_GetInfoResponse {
  goods_info: GoodsApi_GoodsInfoData,
  "photo_lists": {
    "photo_url": "https://images.yumishe.cn/20220625/202208200259163777.jpg", //相册url
    "sort": 2 //排序
  }[], //相册列表
  "link_lists": {
    "goods_id": 49, //id
    "goods_name": "红钐 可勃取样器 HSZ-KBQ", //名称
    "goods_img": "", //主图
    "shop_price": "0.00" //本店价
  }[] //商品关联列表
}

declare interface GoodsApi_GoodsInfoData {
  "goods_id": 45, //id
  "goods_abbr": "xxx笔记本777", //简介
  "goods_name": "艾斯瑞 xxx笔记本777 mac-book max xxxxxx", //名称
  "goods_code": "mac-book max", //型号
  "goods_sn": "AA00045", //编码
  "cat_id": 2, //分类id
  "brand_id": 2, //品牌id
  "purchase_price": "0.00", //进价
  "market_price": "5999.00", //市场价
  "shop_price": "5199.00", //本店价
  "sale_number": 10000, //销量
  "goods_img": "https://images.yumishe.cn/20220625/202206250259163738.jpg", //主图
  "goods_desc": "", //描述
  "goods_spec": "", //规格
  "goods_weight": "2.00", //重量
  "weight_unit": "kg", //重量单位
  "unit": "台", //单位
  "goods_number": number, //库存    111
  "warn_number": 1, //库存警告数
  "is_best": 0, //是否精品
  "is_new": 0, //是否新品
  "is_hot": 0, //是否热品
  "is_sale": 1, //上下架
  "is_collect": 0 | 1, // 是否已加入收藏    1是0否    
  "keywords": "", //关键字
  "title": "xxxxxx", //副标题
  "type_id": 0, //类型id
  "on_sale_time": 0, //上架时间
  "down_sale_time": 0, //下架时间
  "add_time": 1671094476, //发布时间
  "update_time": 1682233072, //更新时间
  "salesman_id": 9, //负责人id
  "is_delete": 0, //是否回收站
  "peas_num": 10, //赠送工游豆数量
  "peas_amount": "20", //工游豆购买金额
  "web_keywords": "xxx", //页面关键字
  "web_title": "yyy", //页面标题
  "web_desc": "zzz", //页面描述
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

/**
 * 商品详情页面参数
 */
declare interface GoodsDetailParamsQuery {
  id: number; // 商品id
}
