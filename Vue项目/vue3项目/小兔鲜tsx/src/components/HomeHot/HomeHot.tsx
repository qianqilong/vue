import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { findHotAPI } from '@/api'
// import { uselazyData } from '@/hooks'
import './HomeHot.less'
import HomePanel from '../HomePanel/HomePanel'
import XtxMore from '../xtx-more/xtx-more'
import HomeSkeleton from '../home-skeleton/HomeSkeleton'
export default defineComponent({
  name: 'HomeHot',
  props: {
    path: {
      type: String,
      default: '/'
    }
  },
  setup () {
    // const box = ref(null)
    // const goods = uselazyData(box, findHotAPI)
    const goods = ref([])
    findHotAPI().then((res:any) => {
      goods.value = res.result
    })
    return () => (
<div class="home-new">
    {/* 具名插槽 */}
  {/* 普通插槽 */}
<HomePanel title="人气推荐" sub-title="人气爆款 不容错过"v-slots={{
  right: () => (
        <XtxMore path="/" />
  ),
  default: () => (
    // <div ref={box} style="position: relative;height: 406px;">
    <ul class="goods-list3">
      {
        goods.value
          ? (goods.value.length !== 0
              ? goods.value.map((item:any) => {
                return (
              <li>
              <RouterLink to="/">
                <img v-lazyload={item.picture} alt=""/>
                <p class="name">{item.title}</p>
                <p class="desc">{item.alt}</p>
              </RouterLink>
            </li>
                )
              })
              : <HomeSkeleton/>)
          : ''
      }

    </ul>
    // </div>
  )
}}>

</HomePanel>
</div>
    )
  }
})
