import { defineComponent, ref, watch } from 'vue'
import { findSubCategoryFilter } from '@/api'
import { useRoute } from 'vue-router'
import './sub-filter.less'
import XtxSkeleton from '../xtx-skeleton/xtx-skeleton'
export default defineComponent({
  name: 'Subfilter',

  setup () {
    const route = useRoute()
    const filterData:any = ref({})
    const filterLoading = ref(false)
    watch(() => route.params.id, (newVal, oldVal) => {
      // 新的路由信息
    //   获取数据
      newVal && findSubCategoryFilter(newVal).then((res:any) => {
        // 品牌全部
        res.result.selectedBrand = null
        res.result.brands.unshift({ id: null, name: '全部' })
        // 销售属性全部
        res.result.saleProperties.forEach((p:any) => {
          p.selectedProp = undefined
          p.properties.unshift({ id: null, name: '全部' })
        })
        filterData.value = res.result
        filterLoading.value = false
      })
    }, { immediate: true })
    return () => (
        <div>
             {
                filterData.value
                  ? <div class="sub-filter">
                <div class="item">
                  <div class="head">品牌：</div>
                  <div class="body">
                    {
                      filterData.value.brands
                        ? filterData.value.brands.map((item:any) => {
                          return <a key={item.id} class={`${filterData.value.selectedBrand === item.id ? 'active' : ''}`} href="javasript:;" >{item.name}</a>
                        })
                        : ''
                    }
                  </div>
                </div>
                {
                    filterData.value.saleProperties
                      ? filterData.value.saleProperties.map((item:any) => {
                        return (
                      <div class="item" key={item.id}>
                      <div class="head">{item.name}：</div>
                      <div class="body">
                    {
                        item.properties.map((sub:any) => {
                          return (<a key={sub.id} href="javasript:;" class={`${item.selectedProp === sub.id ? 'active' : ''}`}>{sub.name}</a>)
                        })
                    }
                      </div>
                      </div>
                        )
                      })
                      : ''
                }

              </div>
                  : <div class="sub-filter">
                  <XtxSkeleton class="item" width="800px" height="40px" />
                  <XtxSkeleton class="item" width="800px" height="40px" />
                  <XtxSkeleton class="item" width="600px" height="40px" />
                  <XtxSkeleton class="item" width="600px" height="40px" />
                  <XtxSkeleton class="item" width="600px" height="40px" />
                </div>
             }
      </div>
    )
  }
})
