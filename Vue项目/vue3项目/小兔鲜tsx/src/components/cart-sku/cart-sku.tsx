import { defineComponent } from 'vue'
import './cart-sku.less'
export default defineComponent({
  setup () {
    return () => (
      <div class="cart-sku1">
        <div class="attrs">
          <span class="ellipsis">颜色：粉色 尺寸：14cm 产地：中国</span>
          <i class="iconfont icon-angle-down"></i>
        </div>
        <div class="layer">
          <div class="loading"></div>
        </div>
      </div>
    )
  }
})
