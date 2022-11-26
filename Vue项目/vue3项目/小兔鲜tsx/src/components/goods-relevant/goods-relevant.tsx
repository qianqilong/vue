import { defineComponent, ref } from 'vue'
import './goods-relevant.less'
import { findRelGoodsAPI } from '@/api'
import XtxCarousel from '../xtx-carousel/xtx-carousel'
export default defineComponent({
  name: 'Goodrelevant',
  props: {
    goodsId: {
      type: String
    }
  },
  setup (props) {
    const sliders:any = ref([])
    findRelGoodsAPI(props.goodsId).then((res:any) => {
      // 每页4条
      const size = 4
      const total = Math.ceil(res.result.length / size)
      for (let i = 0; i < total; i++) {
        sliders.value.push(res.result.slice(i * size, (i + 1) * size))
      }
    })
    return () => (
      <div class="goods-relevant">
      <div class="header">
        <i class="icon" />
        <span class="title">{props.goodsId ? '同类商品推荐' : '猜你喜欢'}</span>
      </div>
      {
        sliders.value.length === 4
          ? <XtxCarousel sliders={sliders.value} style="height:380px" auto-play />
          : ''
      }
    </div>
    )
  }
})
