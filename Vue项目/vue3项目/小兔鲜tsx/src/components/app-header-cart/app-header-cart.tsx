import Message from '@/utils/Message'
import { computed, defineComponent } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import XtxButton from '../xtx-button/xtx-button'
import './app-header-cart.less'
export default defineComponent({
  name: 'AppHeadercart',
  setup () {
    const store = useStore()
    const router = useRouter()
    const list = store.state.cart.list
    // 计算总的价格
    const totalPrice = computed(() => {
      return list.reduce((pre:any, cur:any) => { // 初始值, 当前值
        return (pre + cur.number * parseInt(cur.price))
      }, 0)
    })
    // 计算总的数量
    const totalNumber = computed(() => {
      return list.reduce((pre:any, cur:any) => { // 初始值, 当前值
        return pre + cur.number
      }, 0)
    })
    // 删除购物车
    const deleteCar = (item:any) => {
      store.dispatch('cart/deletecartList', item)
      Message({ type: 'success', text: '删除物品成功！' })
    }
    return () => (
        <div class="cart1">
        <a class="curr" href="javascript:;">
          <i class="iconfont icon-cart" onClick={() => (router.push('/cart'))}></i><em>{totalNumber.value}</em>
        </a>
        <div class="layer">
          <div class="list">
            {
                list.map((item:any) => {
                  return <div class="item">
                    <RouterLink to="">
                      <img src={item.photo} alt=""/>
                      <div class="center">
                        <p class="name ellipsis-2">{item.name}</p>
                        <p class="attr ellipsis">{
                         item.specs.map((sub:any, i:any) => {
                           return `${sub.name}:${sub.values[(item.index[i])].name}   `
                         })
                        }</p>
                      </div>
                      <div class="right">
                        <p class="price">&yen;{item.price * item.number}</p>
                        <p class="count">x{item.number}</p>
                      </div>
                    </RouterLink>
                    <i class="iconfont icon-close-new" onClick={() => deleteCar(item)}></i>
                  </div>
                })
            }

          </div>
          <div class="foot">
            <div class="total">
              <p>共 {totalNumber.value} 件商品</p>
              <p>&yen;{totalPrice.value}</p>
            </div>
            <XtxButton type="plain" onClick={() => (router.push('/cart'))}>去购物车结算</XtxButton>
          </div>
        </div>
      </div>
    )
  }
})
