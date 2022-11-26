import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import './home-goods.less'
export default defineComponent({
  name: 'HomeGoods',
  props: {
    good: {
      type: Object
    }
  },
  setup (props:any) {
    return () => (
      props.good
        ? (
        <div class="goods-item">
        <RouterLink to="/" class="image">
          <img v-lazyload={props.good.picture} alt="" />
        </RouterLink>
        <p class="name ellipsis-2">{props.good.name}</p>
        <p class="desc">{props.good.desc.substr(0, 6)}</p>
        <p class="price">&yen;{props.good.price}</p>
        <div class="extra">
          <RouterLink to="/">
            <span>找相似</span>
            <span>发现现多宝贝 &gt;</span>
          </RouterLink>
        </div>
      </div>
          )
        : ''
    )
  }
})
