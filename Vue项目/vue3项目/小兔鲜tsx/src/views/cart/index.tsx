import GoodsRelevant from '@/components/goods-relevant/goods-relevant'
import XtxBread from '@/components/xtx-bread/xtx-bread'
import XtxBreadItem from '@/components/xtx-bread/xtx-bread-item/xtx-bread-item'
import XtxButton from '@/components/xtx-button/xtx-button'
import XtxCheckbox from '@/components/xtx-checkbox/xtx-checkbox'
import XtxNumbox from '@/components/xtx-numbox/xtx-numbox'
import { computed, defineComponent, onBeforeUpdate, onMounted, reactive, ref } from 'vue'
import Message from '@/utils/Message'
import { RouterLink, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import './index.less'
import CartSku from '@/components/cart-sku/cart-sku'
export default defineComponent({
  name: 'AppHeadercart',
  setup () {
    const number:any = ref([])
    const Setflag:any = ref([true])
    const store = useStore()
    const router = useRouter()
    const list = reactive(store.state.cart.list)
    // 把每个list中数组中添加选择  修改购物车数量
    onMounted(() => {
      list.forEach((item:any, index:any) => {
        number.value.push(item.number)
        item.flag = true
        Setflag.value[index] = item.flag
      })
    })
    // 计算选择的价格
    const totalSwitchPrice = computed(() => {
      // eslint-disable-next-line array-callback-return
      return list.reduce((pre:any, cur:any) => { // 初始值, 当前值
        if (cur.flag === true) {
          pre = pre + parseInt(cur.number) * parseInt(cur.price)
        }
        return pre
      }, 0)
    })
    // 计算已选择的数量
    const totalSwitchNumber = computed(() => {
      return list.reduce((pre:any, cur:any) => { // 初始值, 当前值
        if (cur.flag === true) {
          pre = pre + parseInt(cur.number)
        }
        return pre
      }, 0)
    })
    // 计算总的数量
    const totalNumber = computed(() => {
      return list.reduce((pre:any, cur:any) => { // 初始值, 当前值
        return pre + cur.number
      }, 0)
    })
    // 是否全选
    const checkedAll = computed(() => {
      return Setflag.value.every((item:any) => item)
    })
    const checkAll:any = ref(checkedAll.value)
    // 删除购物车
    const deleteCar = (item:any) => {
      store.dispatch('cart/deletecartList', item)
      Message({ type: 'success', text: '删除物品成功！' })
    }

    // 更新数据
    onBeforeUpdate(() => {
    // 修改仓库中的数据
      store.dispatch('cart/setNumber', number.value)
    //   console.log(checkedAll.value)
    //   console.log(Setflag.value)
    })
    return () => (
<div>
   <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th style={{ width: '120px' }}><XtxCheckbox v-model:checked={checkedAll.value} >全选</XtxCheckbox></th>
              <th style={{ width: '400px' }}>商品信息</th>
              <th style={{ width: '220px' }}>单价</th>
              <th style={{ width: '180px' }}>数量</th>
              <th style={{ width: '180px' }}>小计</th>
              <th style={{ width: '140px' }}>操作</th>
            </tr>
          </thead>
          {/* <!-- 有效商品 --> */}
          <tbody>
           {list.map((item:any, index:number) => {
             return <tr >
               <td><XtxCheckbox v-model:checked={Setflag.value[0]}/></td>
               <td>
                 <div class="goods">
                   <RouterLink to="/"><img src={item.photo} alt=""/></RouterLink>
                   <div>
                     <p class="name ellipsis">{item.name}</p>
                     {/* <!-- 选择规格组件 --> */}
                     <CartSku/>
                   </div>
                 </div>
               </td>
               <td class="tc">
                 <p>&yen;{item.price}</p>
               </td>
               <td class="tc">
                 <XtxNumbox text={''} v-model:number={number.value[index]}/>
               </td>
               <td class="tc"><p class="f16 red">&yen;{item.price * number.value[index]}</p></td>
               <td class="tc">
                 <p><a href="javascript:;">移入收藏夹</a></p>
                 <p><a class="green" href="javascript:;" onClick={() => deleteCar(item)}>删除</a></p>
                 <p><a href="javascript:;">找相似</a></p>
               </td>
             </tr>
           })}

          </tbody>
        </table>
      </div>
      {/* <!-- 操作栏 --> */}
      <div class="action">
        <div class="batch">
          <XtxCheckbox v-model:checked={checkAll.value} >全选</XtxCheckbox>
          <a href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {totalNumber.value} 件商品，已选择 {totalSwitchNumber.value} 件，商品合计：
          <span class="red">¥{totalSwitchPrice.value}</span>
          <XtxButton type="primary">下单结算</XtxButton>
        </div>
      </div>
      {/* <!-- 猜你喜欢 --> */}
      <GoodsRelevant />
    </div>
  </div>
       </div>
    )
  }
})
