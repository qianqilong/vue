import { findGoodsdetailAPI } from '@/api'
import GoodsRelevant from '@/components/goods-relevant/goods-relevant'
import XtxBread from '@/components/xtx-bread/xtx-bread'
import XtxBreadItem from '@/components/xtx-bread/xtx-bread-item/xtx-bread-item'
import XtxNumbox from '@/components/xtx-numbox/xtx-numbox'
import { useRoute } from 'vue-router'
import { defineComponent, provide, ref, Transition, watch } from 'vue'
import './index.less'
import GoodsImage from '@/components/GoodsImage/GoodsImage'
import GoodsSales from '@/components/goods-sales/goods-sales'
import GoodsName from '@/components/goods-name/goods-name'
import GoodsSku from '@/components/goods-sku/goods-sku'
import XtxButton from '@/components/xtx-button/xtx-button'
import GoodsTabs from '@/components/goods-tabs/goods-tabs'
import GoodsHot from '@/components/goods-hot/goods-hot'
import GoodsWarn from '@/components/goods-warn/goods-warn'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'XtxBread',
  setup () {
    const store = useStore()
    const route = useRoute()
    const goodarr:any = ref([])
    const mainPictures:any = ref([])
    // 商品信息
    const goodsInfo:any = ref([])
    // 商品数量
    const number = ref(1)
    // 选择那个规格
    const index = ref([])
    // 商品id
    const id:string = (route.params.id).toString()
    // 获取商品的导航栏
    const getGooddatail = () => {
      findGoodsdetailAPI(id).then((res:any) => {
        goodsInfo.value = res.result
        mainPictures.value = res.result.mainPictures
        res.result.categories.forEach((item:any) => {
          goodarr.value.unshift({ name: item.name, id: item.id })
        })
        goodarr.value.push({ name: res.result.name, id: res.result.id })
      })
    }
    // 监听路由的变化获取导航栏信息
    watch(() => route.params.id, () => {
      provide('goods', goodsInfo)
      return getGooddatail()
    }, { immediate: true })
    // 设置index
    const setindex = (val:any) => {
      index.value = val
    }
    // 加入购物车
    const addCart = () => {
      const cartInfo = {
        id,
        index: index.value,
        specs: goodsInfo.value.specs,
        name: goodsInfo.value.name,
        price: goodsInfo.value.price,
        number: number.value,
        photo: goodsInfo.value.mainPictures[0]
      }
      if (index.value.length === 0 || number.value === 0) return
      store.dispatch('cart/getcartList', cartInfo)
    }
    return () => (
      <div class='xtx-goods-page'>
        <div class="container">
          {/* <!-- 面包屑 --> */}
          <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
            {
                goodarr.value.length !== 0
                  ? (
                  <Transition name="fade-right" mode="out-in">
                  <XtxBreadItem to={`/category/${goodarr.value[0].id}`}>{ goodarr.value[0].name}</XtxBreadItem>
                  </Transition>)
                  : ''
            }
            {
                goodarr.value.length !== 0
                  ? (
                  <Transition name="fade-right" mode="out-in">
                  <XtxBreadItem to={`/category/sub/${goodarr.value[1].id}`}>{ goodarr.value[1].name}</XtxBreadItem>
                  </Transition>)
                  : ''
            }
            {
                goodarr.value.length !== 0
                  ? (
                  <Transition name="fade-right" mode="out-in">
                  <XtxBreadItem to={`/product/${goodarr.value[2].id}`}>{ goodarr.value[2].name}</XtxBreadItem>
                  </Transition>)
                  : ''
            }
          </XtxBread>
          {/* <!-- 商品信息 --> */}
      <div class="goods-info">
        <div class="media">
          {/* 图片信息  */}
          {
           JSON.stringify(mainPictures.value) !== '{}'
             ? <GoodsImage images={mainPictures.value}/>
             : ''
          }
        <GoodsSales />
        </div>
        <div class="spec">
          {/* 商品信息 */}
          {
            goodsInfo.value.length !== 0
              ? <GoodsName goodsInfo={goodsInfo.value} number={number.value}/>
              : ''
          }
          {
            goodsInfo.value.length !== 0
              ? <GoodsSku onSetIndex={setindex} goods={goodsInfo.value }/>
              : ''
          }
          <XtxNumbox v-model:number={number.value}/>
          {/* 加入购物车操作 */}
          <XtxButton type="primary" onClick={addCart} style="margin-top:20px;" v-slots={{ default: () => ('加入购物车') }}></XtxButton>
        </div>
      </div>
          {/* <!-- 商品推荐 --> */}
          {
            goodsInfo.value.id
              ? <GoodsRelevant goodsId={goodsInfo.value.id}/>
              : ''
          }
          {/* <!-- 商品详情 --> */}
          <div class="goods-footer">
            <div class="goods-article">
              {/* <!-- 商品+评价 --> goods="goods" */}
              <GoodsTabs />
              <div class="goods-tabs"></div>
              {/* <!-- 注意事项 --> */}
              <div class="goods-warn">
                <GoodsWarn/>
              </div>
            </div>
            {/* <!-- 24热榜+专题推荐 --> */}
            <div class="goods-aside">
          <GoodsHot goodsId={goodsInfo.value.id} type={1} />
          <GoodsHot goodsId={goodsInfo.value.id} type={2} />
            </div>
          </div>
        </div>
      </div>
    )
  }
})
