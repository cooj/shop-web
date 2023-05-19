<template>
  <section class="goods-detail">
    <div v-if="defData.loading" class="container">
      <GoodsBreadcrumb class="my15px" :cid="goodsInfo?.cat_id" :name="goodsInfo?.goods_name" />
      <div class="goods-main">
        <div class="goods-zoom">
          <GoodsImgZoom v-if="(goodsImgList.length > 0)" :images="goodsImgList" />
          <div v-else class="image-err">
            <i class="i-ep-picture" />
          </div>
        </div>
        <ClientOnly>
          <div class="goods-cen">
            <div class="goods-tle">
              {{ goodsInfo?.goods_name }}
            </div>
            <ul class="goods-pros">
              <li class="items-center bg-#f8f8f8">
                <div class="lt">
                  价格
                </div>
                <div class="gt">
                  <div class="price1">
                    <b>￥{{ goodsInfo?.shop_price }}<span v-if="goodsInfo?.unit">/{{ goodsInfo?.unit }}</span></b>
                    <!-- <span class="price2 ml8px">{{ goodsData?.market_price }}</span> -->
                  </div>
                </div>
              </li>
              <li class="items-center bg-#f8f8f8 -mt10px">
                <div class="lt" />
                <div class="gt">
                  <span class="price3" @click="onApprove">
                    注册企业会员享企业价
                    <i class="i-ep-arrow-right inline-block" />
                  </span>
                  <span class="text-12px c-#666">会员价</span>
                </div>
              </li>
              <li>
                <div class="lt">
                  商品编号
                </div>
                <div class="gt">
                  {{ goodsInfo?.goods_sn }}
                </div>
              </li>
              <li>
                <div class="lt">
                  商品型号
                </div>
                <div class="gt">
                  {{ goodsInfo?.goods_code }}
                </div>
              </li>
              <!-- <li>
              <div class="lt">
                品牌
              </div>
              <div class="gt">
                0.迪塞福
              </div>
            </li>
            <li>
              <div class="lt">
                重量
              </div>
              <div class="gt">
                0.2170kg
              </div>
            </li> -->
              <li>
                <div class="lt">
                  库存
                </div>
                <div v-if="goodsInfo" class="gt">
                  <p v-if="goodsInfo?.goods_number > 10">
                    有货
                  </p>
                  <p v-else-if="goodsInfo?.goods_number > 0">
                    商品即将售完
                  </p>
                  <p v-else>
                    暂无库存
                  </p>
                </div>
              </li>
              <li>
                <div class="lt">
                  支付方式
                </div>
                <div class="gt">
                  <el-button text bg size="small" class="cursor-default!">
                    <i class="i-ic-baseline-wechat mr3px c-#09bb07" />
                    微信
                  </el-button>
                  <el-button text bg size="small" class="cursor-default!">
                    <i class="i-ic-baseline-payment mr3px c-#3887ff" />
                    在线支付
                  </el-button>
                  <el-button text bg size="small" class="cursor-default!">
                    <i class="i-ic-twotone-payments mr3px c-#ff5335" />
                    线下转账
                  </el-button>
                </div>
              </li>
              <li class="items-center">
                <div class="lt">
                  购买数量
                </div>
                <div class="gt">
                  <el-input-number v-model="form.number" :min="1" :max="10000" />
                  <span class="ml5px c-#aaa">起购量:1个</span>
                </div>
              </li>
              <li class="my8px b-t b-t-dashed">
                <!--  -->
              </li>
              <li>
                <div class="lt" />
                <div class="gt">
                  <el-button v-if="goodsInfo?.is_collect" type="primary" text bg size="small">
                    <i class="i-carbon-favorite-filled mr3px" />
                    收藏
                  </el-button>
                  <el-button v-else text bg size="small" @click="onCollect">
                    <i class="i-carbon-favorite mr3px" />
                    收藏
                  </el-button>
                  <el-button text bg size="small" @click="onShare">
                    <i class="i-ep-share mr3px" />
                    分享
                  </el-button>
                </div>
              </li>
              <li class="buy-item">
                <div class="lt">
                  <!-- 购买数量 -->
                </div>
                <div class="gt">
                  <el-button type="primary" size="large">
                    立即购买
                  </el-button>
                  <el-button type="primary" plain size="large" @click="onAddCart">
                    <i class="i-carbon-shopping-cart mr3px" />
                    加入购物车
                  </el-button>
                </div>
              </li>
            </ul>
          </div>
          <div class="goods-right">
            <img src="https://www.gdbmro.com/goodsImg/lADPDgtYxBInjCPNAW7M1w_215_366.jpg" alt="">
          </div>
        </ClientOnly>
      </div>
      <div class="goods-cont">
        <div class="lt">
          <el-tabs v-model="defData.leftActive" class="goods-lt-tabs">
            <el-tab-pane label="推荐商品" name="1">
              <ul class="goods-list">
                <li v-for="item in goodsData?.link_lists" :key="item.goods_id">
                  <NuxtLink class="pos" :to="`/goods/${item.goods_id}`">
                    <img :src="item.goods_img" :alt="item.goods_name" :title="item.goods_name">
                  </NuxtLink>
                  <div class="tle">
                    <NuxtLink :to="`/goods/${item.goods_id}`">
                      {{ item.goods_name }}
                    </NuxtLink>
                  </div>
                  <div class="pce">
                    <span>￥{{ item.shop_price }}</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="gt">
          <el-tabs v-model="defData.rightActive" class="goods-gt-tabs">
            <el-tab-pane label="商品详情" name="1">
              <div v-html="goodsInfo?.goods_desc" />
            </el-tab-pane>
            <el-tab-pane label="商品问答" name="2">
              <ClientOnly>
                <el-input v-model="form.question" style="width: 300px;margin-right: 10px;" placeholder="输入提问" clearable />
                <el-button style="background-color: var(--el-color-primary);color: white;" @click="questionClick">
                  发送提问
                </el-button>

                <el-table :data="defData.tableData" style="width: 100%">
                  <!-- <el-table-column type="expand">
                  <template #default="props">
                    <div m="4">
                      <h3>回答</h3>
                      <el-table :data="props.row.family">
                        <el-table-column label="用户" prop="user_name" />
                        <el-table-column label="内容" prop="content" />
                      </el-table>
                    </div>
                  </template>
                </el-table-column> -->
                  <el-table-column label="" prop="user_name" />
                  <el-table-column label="" prop="content" />
                </el-table>
                <div class="goods-pagination">
                  <el-pagination v-model:current-page="defData.page" v-model:page-size="defData.pageSize" small background
                    layout=" prev, pager, next,total, jumper" :total="defData.total" />
                </div>
              </ClientOnly>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div class="no-goods-box">
        <BaseError />
      </div>
    </div>
    <ClientOnly>
      <el-dialog v-model="defData.shareVisible" title="分享给好友" width="450px" draggable>
        <el-form class="-mt20px" label-position="top">
          <el-form-item label="链接地址">
            <el-input v-model="defData.shareLink" class="pr12px w70%!" disabled />
            <el-button type="primary" class="w30%" @click="onCopy('text')">
              复制地址
            </el-button>
          </el-form-item>
          <el-form-item label="二维码">
            <div class="flex">
              <el-image :src="defData.shareCode" class="mr12px h120px w120px b b-1 b-#eee" />
              <el-button type="primary" @click="onDownload">
                下载二维码
              </el-button>
            </div>
          </el-form-item>
        </el-form>
        <!-- <div class="text-center">
          <el-image :src="defData.shareCode" class="h120px w120px -mt20px" />
          <div class="">
            <el-button type="success" text @click="onCopy('text')">
              复制链接地址
            </el-button>
            <el-button type="warning" text @click="onCopy('img')">
              复制二维码
            </el-button>
          </div>
        </div> -->
      </el-dialog>
    </ClientOnly>
  </section>
</template>

<script lang="ts" setup>
import QRCode from 'qrcode'
import { GoodsApi } from '~/api/goods/list'
import { InterListApi } from '~/api/user/interList'
import { RecordApi } from '~/api/user/record'

const route = useRoute()
const userState = useUserState()

const defData = reactive({
  user_id: 0,
  page: 1,
  total: 10,
  pageSize: 10,
  leftActive: '1',
  rightActive: '1',
  loading: true,
  imgReady: false,
  shareVisible: false,
  shareCode: '', // 分享二维码
  shareLink: '', // 分享的链接地址
  tableData: [] as InterListApi_getListResponse['lists'],
})
// 商品信息
const goodsData = ref<GoodsApi_GetInfoResponse>()
const goodsInfo = ref<GoodsApi_GoodsInfoData>()
const goodsImgList = ref<string[]>([])

const form = reactive({
  number: 1, // 购买数量
  question: '', // 问答列表 提问
})
const goods_id = useRouteParam('id')

const initData = async () => {
  if (!goods_id.value) return
  // 正则判断id是否为数字
  if (!(/^[0-9]+$/.test(goods_id.value))) {
    defData.loading = false
    return
  }
  const { data } = await GoodsApi.getInfo({ goods_id: Number(goods_id.value) })
  if (data.value?.code === 200) {
    const dat = data.value.data
    const infoData = dat.goods_info
    // console.log('dat :>> ', dat)
    // if (goods.goods_id === id) {
    if (infoData) {
      goodsData.value = dat
      goodsInfo.value = infoData

      // 商品图片
      const imgArr: string[] = infoData.goods_img ? [infoData.goods_img] : []
      dat.photo_lists.forEach((item) => {
        if (item.photo_url) imgArr.push(item.photo_url)
      })
      goodsImgList.value = imgArr

      // 设置seo
      const meta = []
      if (infoData.web_desc) meta.push({ name: 'description', content: infoData.web_desc })
      if (infoData.web_keywords) meta.push({ name: 'keywords', content: infoData.web_keywords })
      useHead({
        title: infoData.web_title || infoData.goods_name,
        meta,
      })
    } else {
      // ElMessage.error('未获取到商品信息,请检查地址是否正确')
      defData.loading = false
      // navigateTo('/404')
    }
  } else {
    //
  }
}
initData()

// 问答列表 获取数据
const interListData = async () => {
  const param: InterListApi_getList = {
    is_paging: 1,
    page: defData.page,
    pagesize: defData.pageSize,
    goods_id: Number(route.params.id),
  }
  const res = await InterListApi.getList(param)
  if (res.data.value?.code !== 200) return ElMessage.error(res.data.value?.msg)
  defData.tableData = res.data.value.data.lists
  defData.total = res.data.value.data.total
}
interListData()

// 新增问答
const questionClick = async () => {
  if (!form.question) return ElMessage.error('请先输入')
  const user = await userState.getUserInfo()
  if (user.value) {
    defData.user_id = user.value.user_id
  } else {
    return
  }
  const info: InterListApi_addList = {
    goods_id: Number(route.params.id),
    user_id: defData.user_id,
    type: 1,
    q_id: 0,
    content: form.question,
  }
  const { data: inter } = await InterListApi.addList(info)
  if (inter.value?.code !== 200) return ElMessage.error(inter.value?.msg)
  ElMessage.success('成功')
  form.question = ''
}

// 商品收藏
const onCollect = async () => {
  // 用户未登录时
  if (!userState.userInfo.value?.user_id) {
    return navigateTo('/login')
  }
  // 已经收藏了，取消收藏状态
  if (goodsInfo.value?.is_collect) {
    // 清除收藏
    const params: RecordApi_Del = {
      goods_ids: goodsInfo.value.goods_id.toString(),
      type: 1,
      user_id: userState.userInfo.value.user_id,
    }
    const { data } = await RecordApi.del(params)
    if (data.value?.code === 200) {
      goodsInfo.value.is_collect = 0 // 清除收藏标志位
    }
  } else {
    const params: RecordApi_Add = {
      goods_id: goodsInfo.value!.goods_id,
      type: 1,
      user_id: userState.userInfo.value.user_id,
    }
    const { data } = await RecordApi.add(params)
    if (data.value?.code === 200) {
      goodsInfo.value!.is_collect = 1
    }
  }
}

// 加入购物车
const onAddCart = async () => {
  // 用户未登录时，不允许加入购物车页面
  if (!userState.userInfo.value?.user_id) {
    ElMessage.error('请先登录!')
    return navigateTo('/login')
  }

  const { number } = form
  if (number > 0 && goodsInfo.value?.goods_id) {
    const { data } = await GoodsApi.addCart({ goods_id: goodsInfo.value.goods_id, goods_number: number })
    if (data.value?.code === 200) {
      ElMessage.success('加入购物车成功')
      form.number = 1
    } else {
      ElMessage.error('加入购物车失败')
    }
  } else {
    ElMessage.error('购买数量不能为0')
  }
}

// 商品分享
const onShare = async () => {
  if (userState.userInfo.value?.user_id) {
    defData.shareLink = `${location.origin}/login/register?id=${userState.userInfo.value?.user_id}`
    if (!defData.shareCode) {
      defData.shareCode = await QRCode.toDataURL(defData.shareLink)
    }

    defData.shareVisible = true
  } else {
    navigateTo('/login')
  }
}

/**
 * base64转Blob：
 */
const base64ToBlob = (url: string) => {
  const arr = url.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// 复制链接地址或二维码
const onCopy = async (type: 'text' | 'img') => {
  if (type === 'text') {
    try {
      await navigator.clipboard.writeText(defData.shareLink)
      ElMessage.success('复制成功')
    } catch (err) {
      const e = document.createElement('textarea')
      document.body.appendChild(e)
      e.innerHTML = defData.shareLink
      e.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
      }
      document.body.removeChild(e)
      ElMessage.success('复制成功')
    }
    // navigator.clipboard.writeText(defData.shareLink).then(() => {
    //   ElMessage.success('复制成功')
    // }).catch(() => {
    //   const e = document.createElement('textarea')
    //   document.body.appendChild(e)
    //   e.innerHTML = defData.shareLink
    //   e.select()
    //   if (document.execCommand('copy')) {
    //     document.execCommand('copy')
    //   }
    //   document.body.removeChild(e)
    //   ElMessage.success('复制成功')
    // })
  } else {
    const myBlob = base64ToBlob(defData.shareCode)
    navigator.clipboard.write([new window.ClipboardItem({ [myBlob.type]: myBlob })]).then(() => {
      ElMessage.success('复制成功')
    })
  }
}

// 下载二维码
const onDownload = () => {
  const myBlob = base64ToBlob(defData.shareCode)
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(myBlob)
  link.download = 'qrcode.png'
  link.click()

  document.removeChild(link)
}

// 认证企业会员
const onApprove = () => {
  if (userState.userInfo.value?.user_id) {
    navigateTo('/login')
  } else {
    // 转到企业认证页面
  }
}

// 添加商品浏览历史
const onHistory = async () => {
  // 进入页面2秒后加入历史记录中
  await wait(2000)
  if (userState.userInfo.value?.user_id) {
    const params: RecordApi_Add = {
      user_id: userState.userInfo.value.user_id,
      goods_id: goodsInfo.value!.goods_id,
      type: 2,
    }
    await RecordApi.add(params)
  }
}

onMounted(() => {
  onHistory()
})

definePageMeta({
  layout: 'home',
})
</script>

<style lang="scss" scoped>
.goods-main {
  display: flex;
  justify-content: space-between;
  --goods-img-zoom-width: 400px;
  --goods-right-width: 230px;

  .goods-zoom {
    width: var(--goods-img-zoom-width);
    min-height: var(--goods-img-zoom-width);
    background-color: var(--el-color-white);

    .image-err {
      background-color: var(--el-color-white);
    }

    :deep(.swiper-box) {
      margin-bottom: 10px;
      --swiper-navigation-sides-offset: 8px;

      .swp {
        width: calc(100% - 60px);
      }

    }
  }

  .goods-cen {
    --goods-cen-left-blank: 10px;
    width: calc(100% - var(--goods-img-zoom-width) - var(--goods-right-width) - var(--goods-cen-left-blank));
    margin-left: var(--goods-cen-left-blank);
    background-color: var(--el-color-white);
    padding: 10px;
    padding-left: 20px;
    padding-top: 20px;
  }

  .goods-right {
    width: var(--goods-right-width);
    background-color: var(--el-color-white);
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .goods-tle {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .goods-pros {

    >li {
      font-size: 14px;
      display: flex;
      text-align: left;
      font-weight: normal;
      // line-height: 24px;
      line-height: 1.6;

      .lt {
        width: 80px;
        padding: 5px 8px;

        color: var(--el-text-color-secondary);
      }

      .gt {
        flex: 1;
        padding: 5px 8px;
        color: var(--el-text-color-primary);

        .price1 {

          b {
            font-size: 28px;
            color: var(--el-color-primary);

            span {
              font-size: 70%;
              font-weight: normal;
            }
          }

        }

        .price2 {
          font-size: 16px;
          text-decoration: line-through;
          color: var(--el-text-color-secondary);
        }

        .price3 {
          display: inline-flex;
          align-items: center;
          padding-left: 3px;
          border: 1px solid var(--el-color-info);
          font-size: 12px;
          cursor: pointer;

          &:hover {
            color: var(--el-color-primary);
            border-color: var(--el-color-primary);
          }
        }
      }
    }

    .buy-item {
      :deep(.el-button) {
        --el-font-size-base: 16px;
      }
    }

  }
}

.goods-cont {
  display: flex;
  justify-content: space-between;
  --goods-cont-left-width: 250px;
  margin: 20px 0;

  .lt {
    width: var(--goods-cont-left-width);

    :deep(.el-tabs--top) {

      // :not(:last-child)
      .el-tabs__item.is-top:nth-child(2) {
        margin-left: 20px;
      }
    }
  }

  .gt {
    width: calc(100% - var(--goods-cont-left-width) - 10px);
    background-color: var(--el-color-white);

  }

  :deep(.el-tabs--top) {

    // :not(:last-child)
    .el-tabs__item {
      font-weight: bold;
    }

    .el-tabs__item.is-top:nth-child(2) {
      // padding-left: 20px;
      margin-left: 20px;
    }
  }

  :deep(.el-tabs__content) {
    padding: 10px;
  }

  .goods-lt-tabs {
    background-color: var(--el-color-white);
    min-height: 350px;
  }

  .goods-gt-tabs {
    :deep(.el-tabs__content) {
      padding: 15px;
    }
  }
}

.goods-list {
  li {
    padding: 10px;

    +li {
      border-top: 1px dashed var(--el-border-color-light);
    }
  }

  .pos {
    padding-bottom: 100%;
    display: block;
  }

  .tle {
    height: 40px;
    margin-bottom: 8px;

    a {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 20px;
      max-height: 40px;
      font-size: 14px;
      color: var(--el-text-color-regular);

      &:hover {
        cursor: pointer;
        color: var(--el-color-primary);
        text-decoration: underline;
      }
    }
  }

  .pce {
    font-size: 13px;
    font-weight: bold;
    color: var(--el-color-primary);
  }
}

.no-goods-box {
  margin: 20px 0;
  padding: 30px;
  border: 1px solid var(--el-border-color-light);
  background-color: var(--el-color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
</style>
