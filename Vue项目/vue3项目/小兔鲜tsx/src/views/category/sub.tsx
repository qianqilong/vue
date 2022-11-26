import { defineComponent, ref } from 'vue'
import './sub.less'
import SubBread from '@/components/sub-bread/sub-bread'
import SubFilter from '@/components/sub-filter/sub-filter'
import SubSort from '@/components/sub-sort/sub-sort'
import GoodsItem from '@/components/goods-item/goods-item'
import { findSubCategoryGoods } from '@/api'
import { useRoute } from 'vue-router'
import XtxInfiniteLoading from '@/components/xtx-infinite-loading/xtx-infinite-loading'
export default defineComponent({
  name: 'Sub',
  setup () {
    const route = useRoute()
    const loading = ref(false)
    const finished = ref(false)
    const goodsList:any = ref([])
    // 查询参数
    const reqParams = {
      page: 1,
      pageSize: 20
    }
    // 获取数据函数
    const getData = () => {
      loading.value = true
      findSubCategoryGoods(reqParams).then((res:any) => {
        if (res.result.items.length) {
          goodsList.value.push(...res.result.items)
          reqParams.page++
        } else {
          // 加载完毕
          finished.value = true
        }
        loading.value = false
      })
    }

    // 获取用户的登录信息
    return () => (
      <div class='sub-category'>
      <div class="container">
        {/* <!-- 面包屑 --> */}
        <SubBread />
        {/* <!-- 筛选区 --> */}
       <SubFilter />
       <div class="goods-list1">
        {/* <!-- 排序 --> */}
             <SubSort />
             <ul>
       {
         goodsList.value
           ? goodsList.value.map((item:any) => {
             return (
            <li>
            <GoodsItem good={item}/>
            </li>
             )
           })
           : ''
       }
        </ul>
        {/* <!-- 加载 --> */}
        <XtxInfiniteLoading loading={loading.value} finished={finished.value} onInfinite={getData}/>
       </div>
      </div>
      </div>
    )
  }
})
