import { findHotGoodsAPI } from '@/api'
import { computed, defineComponent, ref } from 'vue'
import GoodsItem from '../goods-item/goods-item'
import './goods-hot.less'
export default defineComponent({
  name: 'Goodcomment',
  props: {
    type: {
      type: Number,
      default: 1
    },
    goodsId: {
      type: String
    }
  },
  setup (props:any) {
    const titleObj = ['24小时热销榜', '周热销榜', '总热销榜']
    const title = computed(() => {
      return titleObj[props.type]
    })
    const goodsList = ref([])
    findHotGoodsAPI(props.goodsId, props.type).then((data:any) => {
      goodsList.value = data.result
    })
    return () => (
        <div class="goods-hot">
        <h3>{ title.value }</h3>
        <div>
            {
               goodsList.value.length !== 0
                 ? goodsList.value.map((item:any) => {
                   return <GoodsItem good={item}/>
                 })
                 : ''
            }
        </div>
      </div>
    )
  }
})
