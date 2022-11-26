import XtxBread from '@/components/xtx-bread/xtx-bread'
import XtxBreadItem from '@/components/xtx-bread/xtx-bread-item/xtx-bread-item'
import XtxCarousel from '@/components/xtx-carousel/xtx-carousel'
import './index.less'
import { computed, defineComponent, ref, Transition, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { findbBannerAPI, findTopCategoryAPI } from '@/api'
import GoodsItem from '@/components/goods-item/goods-item'
import XtxMore from '@/components/xtx-more/xtx-more'
export default defineComponent({
  name: 'Categroy',
  setup () {
    // 获取仓库信息
    const store = useStore()
    // 获取路由携带的参数
    const route = useRoute()
    // 携带的信息
    const topCategory:any = computed(() => {
    // 路由相对应的参数
      let cate = {}
      const item = store.state.category.list.find((item:any) => {
        return item.id === route.params.id
      })
      if (item) cate = item
      return cate
    })
    // 获取轮播图数据
    const sliders = ref([])
    findbBannerAPI().then((data:any) => {
      sliders.value = data.result
    })
    const results:any = ref([])
    // 获取不同分类商品
    const getSubList = () => {
      findTopCategoryAPI(route.params.id).then((res:any) => {
        results.value = res.result.children
      })
    }
    watch(() => route.params.id, (newVal) => {
      // newVal && getSubList()
      if (newVal && `/category/${newVal}` === route.path) getSubList()
    }, { immediate: true })
    // 获取用户的登录信息
    return () => (
      <div class="top-category">
      <div class="container">
        {/* <!-- 面包屑 --> */}
        <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem to={route.path} key={topCategory.value.id}>{topCategory.value.name}</XtxBreadItem>
        </Transition>
        </XtxBread>
        {/* <!-- 轮播图 --> */}
        <XtxCarousel sliders={sliders.value} style="height:500px" />
        {/* <!-- 所有二级分类 --> */}
        <div class="sub-list">
          <h3>全部分类</h3>
          <ul>
            {
             topCategory.value.children
               ? topCategory.value.children.map((item:any) => {
                 return (
                <li>
                  <a href="javascript:;">
                  <img src={item.picture} />
                  <p>{item.name}</p>
                  </a>
                 </li>
                 )
               })
               : ''
            }

          </ul>
        </div>
        {/* <!-- 不同分类商品 --> */}
        {
          results.value
            ? results.value.map((item:any) => {
              return (
                <div class="ref-goods" key={item.id}>
                <div class="head">
                  <h3>- {item.name} -</h3>
                  <p class="tag">温暖柔软，品质之选</p>
                  <XtxMore />
                </div>
                <div class="body">
                  {
                    item.goods
                      ? item.goods.map((item:any) => {
                        return (<GoodsItem good={item}/>)
                      })
                      : ''
                  }
                </div>
                 </div>
              )
            })
            : ''
        }
      </div>
    </div>
    )
  }
})
