import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { findNewAPI } from '@/api'
import { uselazyData } from '@/hooks'
import './HomeNew.less'
import HomePanel from '../HomePanel/HomePanel'
import HomeSkeleton from '../home-skeleton/HomeSkeleton'
import XtxMore from '../xtx-more/xtx-more'
export default defineComponent({
  name: 'HomeNew',
  props: {
    path: {
      type: String,
      default: '/'
    }
  },
  setup () {
    // const goods = ref([])
    const box = ref(null)
    const goods = uselazyData(box, findNewAPI)
    // findNewAPI().then((res:any) => {
    //   goods.value = res.result
    // })

    return () => (
<div class="home-new">
    {/* 具名插槽 */}
  {/* 普通插槽 */}
<HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱"v-slots={{
  right: () => (
        <XtxMore path="/" />
  ),
  default: () => (
    <div ref={box} style="position: relative;height: 406px;">
    <ul class="goods-list2">
      {
          goods.value
            ? (goods.value.length !== 0
                ? goods.value.map((item:any) => {
                  return (
                <li>
                  {/* {`/product/${item.id}`} */}
                <RouterLink to='/'>
                    <img v-lazyload={item.picture} alt=""/>
                    <p class="name ellipsis">{item.name}</p>
                    <p class="price">&yen;{item.price}</p>
                </RouterLink>
            </li>
                  )
                })
                : <HomeSkeleton/>)
            : ''
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
