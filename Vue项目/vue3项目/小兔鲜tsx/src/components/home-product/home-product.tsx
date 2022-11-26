import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import HomeGoods from '../home-goods/home-goods'
import HomePanel from '../HomePanel/HomePanel'
import XtxMore from '../xtx-more/xtx-more'
import './home-product.less'
export default defineComponent({
  name: 'HomeProduct',
  props: {
    good: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  },
  setup (props) {
    return () => (
        <div class="home-product">
        <HomePanel title={props.good.name} v-slots={{
          right: () => (
            <div class="sub">
            {
                props.good
                  ? props.good.children.map((item:any) => {
                    return (
                        <RouterLink to="/" key={item.id}>{item.name}</RouterLink>
                    )
                  })
                  : ''
            }

         <XtxMore />
         </div>
          ),
          default: () => (
            <div class="box">
            <RouterLink class="cover" to="/">
              <img v-lazyload={props.good.photo} alt=""/>
              <strong class="label">
                <span>{props.good.name}馆</span>
                <span>全场3件7折</span>
              </strong>
            </RouterLink>
            <ul class="goods-list">
                {
                    props.good
                      ? props.good.goods.map((item:any) => {
                        return (
                          <li >
                            <HomeGoods good={item} key={item.id} />
                          </li>
                        )
                      })
                      : ''
                }
              <li >
                <HomeGoods />
              </li>
            </ul>
          </div>
          )
        }} >
        </HomePanel>
      </div>
    )
  }
})
