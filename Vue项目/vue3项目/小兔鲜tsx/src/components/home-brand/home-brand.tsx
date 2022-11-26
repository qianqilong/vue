import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { findBrandAPI } from '@/api'
import HomePanel from '../HomePanel/HomePanel'
import './home-brand.less'
import XtxSkeleton from '../xtx-skeleton/xtx-skeleton'
export default defineComponent({
  name: 'HomeBrand',
  setup () {
    const brands = ref([])
    const arr = ['', '', '', '', '']
    const index = ref(0)
    findBrandAPI(10).then((res:any) => {
      brands.value = res.result
    })
    const toggle = (step:number) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > 1) return
      index.value = newIndex
    }
    return () => (
<div class="home-new">
    {/* 具名插槽 */}
  {/* 普通插槽 */}
<HomePanel title="热门品牌" sub-title="国际经典 品质保证"v-slots={{
  right: () => (
    <div>
    <a href="javascript:;" onClick={() => toggle(-1)} class={`iconfont iconfont1 icon-angle-left prev ${index.value === 0 ? 'disabled' : ''}`}></a>
    <a href="javascript:;" onClick={() => toggle(1)} class={`iconfont iconfont1 icon-angle-right next ${index.value === 1 ? 'disabled' : ''}`}></a>
    </div>
  ),
  default: () => (
    <div class="box">
    <ul class="list" style={{ transform: `translateX(${-index.value * 1240}px)` }}>
    {
    brands.value.length !== 0
      ? brands.value.map((item:any) => {
        return (
          <li>
            <RouterLink to="/">
              <img v-lazyload={item.picture} alt=""/>
            </RouterLink>
          </li>
        )
      })
      : arr.map((_, index) => {
        return (
            <div class="skeleton">
            <XtxSkeleton class="item" key={index} animated bg="#e4e4e4" width="240px" height="305px"/>
            </div>
        )
      })
}

    </ul>
  </div>
  )
}}>
</HomePanel>
</div>
    )
  }
})
