import { defineComponent, ref } from 'vue'
import XtxCity from '../xtx-city/xtx-city'
import './goods-name.less'
export default defineComponent({
  name: 'GoodsName',
  props: {
    goodsInfo: {
      type: Object
    },
    number: {
      type: Number,
      default: 1
    }
  },
  setup (props:any) {
    return () => (
<div>
<p class="g-name">{props.goodsInfo.name}</p>
<p class="g-desc">{props.goodsInfo.desc}</p>
<p class="g-price">
  <span class="span1">{props.number * props.goodsInfo.price}</span>
  <span class="span1">{props.goodsInfo.oldPrice}</span>
</p>
<div class="g-service">
  <dl>
    <dt>促销</dt>
    <dd>12月好物放送，App领券购买直降120元</dd>
  </dl>
  <dl>
    <dt>配送</dt>
    <dd>
      <XtxCity />
    </dd>
  </dl>
  <dl>
    <dt>服务</dt>
    <dd>
      <span class="span1">无忧退货</span>
      <span class="span1">快速退款</span>
      <span class="span1">免费包邮</span>
      <a href="javascript:;">了解详情</a>
    </dd>
  </dl>
</div>
       </div>
    )
  }
})
