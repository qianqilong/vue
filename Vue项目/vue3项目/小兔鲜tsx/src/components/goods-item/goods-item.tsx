import './goods-item.less'
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
export default defineComponent({
  name: 'Categroy',
  props: {
    good: {
      type: Object
    }
  },
  setup (props:any) {
    return () => (
        <RouterLink to={`/product/${props.good.id}`} class='goods-item'>
        <img src={props.good.picture} alt=""/>
        <p class="name ellipsis">{props.good.name}</p>
        <p class="desc ellipsis">{props.good.desc}</p>
        <p class="price">&yen;{props.good.price}</p>
        </RouterLink>
    )
  }
})
