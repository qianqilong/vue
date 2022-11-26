import { defineComponent, ref } from 'vue'
import GoodsComment from '../GoodsComment/GoodsComment'
import GoodsDetail from '../GoodsDetail/goods-detail'
import './goods-tabs.less'
export default defineComponent({
  name: 'Goodtabs',
  setup () {
    const tab = ref('comment')
    const clickTab = (val:string) => {
      tab.value = val
    }
    return () => (
        <div class="goods-tabs">
        <nav>
          <a onClick={() => clickTab('detail')} class={`${tab.value === 'detail' ? 'active' : ''}` }>商品详情</a>
          <a onClick={() => clickTab('comment')} class={`${tab.value === 'comment' ? 'active' : ''}` }>商品评价<span>(500+)</span></a>
        </nav>
        {
        tab.value === 'detail'
          ? <GoodsDetail/>
          : <GoodsComment/>
      }
      </div>
    )
  }
})
