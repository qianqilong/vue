<template>
  <div class="xtx-cart-page">
    <div class="container">
      <Globalbread>
        <GlobalbreadItem to="/">首页</GlobalbreadItem>
        <GlobalbreadItem>购物车</GlobalbreadItem>
      </Globalbread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120"><CategoryCheckbox v-model="isAllchecked">全选</CategoryCheckbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <template v-if="cart.list.length !== 0">
            <!-- 有效商品 -->
            <tbody>
              <tr v-for="item in cart.validList" :key="item.id">
                <td><CategoryCheckbox v-model="item.selected" /></td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/product/${item.id}`"><img :src="item.picture" alt="" /></RouterLink>
                    <div>
                      <p class="name ellipsis">{{ item.name }}</p>
                      <!-- 选择规格组件 -->
                      <CartSku
                        :attrsText="item.attrsText"
                        :skuId="item.skuId"
                        @change="(sku) => change(item.skuId, sku)" />
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ item.nowPrice }}</p>
                  <p>
                    比加入时降价 <span class="red">&yen;{{ item.price - item.nowPrice }}</span>
                  </p>
                </td>
                <td class="tc">
                  <GlobalNumbox v-model="item.count" />
                </td>
                <td class="tc">
                  <p class="f16 red">&yen;{{ item.count * item.nowPrice }}</p>
                </td>
                <td class="tc">
                  <p><a href="javascript:;">移入收藏夹</a></p>
                  <p><a class="green" @click="deleteCart(item.skuId)">删除</a></p>
                  <p><a href="javascript:;">找相似</a></p>
                </td>
              </tr>
            </tbody>
            <!-- 无效商品 -->
            <tbody v-if="cart.unvalidList.length !== 0">
              <tr>
                <td colspan="6"><h3 class="tit">失效商品</h3></td>
              </tr>
              <tr v-for="item in cart.unvalidList" :key="item.id">
                <td><CategoryCheckbox v-model="item.selected" style="color: #eee" /></td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/product/${item.id}`"><img :src="item.picture" alt="" /></RouterLink>
                    <div>
                      <p class="name ellipsis">{{ item.name }}</p>
                      <p class="attr">{{ item.attrsText }}</p>
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ item.nowPrice }}</p>
                </td>
                <td class="tc">{{ item.count }}</td>
                <td class="tc">
                  <p>&yen;{{ item.count * item.nowPrice }}</p>
                </td>
                <td class="tc">
                  <p><a class="green" @click="deleteCart(item.skuId)">删除</a></p>
                  <p><a href="javascript:;">找相似</a></p>
                </td>
              </tr>
            </tbody>
          </template>
        </table>
        <cartNone v-if="cart.list.length == 0" />
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <CategoryCheckbox v-model="isAllchecked">全选</CategoryCheckbox>
          <a href="javascript:;" @click="totalDelete">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="deleteunvalidList">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ cart.totalCount }} 件商品，已选择 {{ cart.selectListCount }} 件，商品合计：
          <span class="red">¥{{ cart.selectListPrice }}</span>
          <GlobalButton type="primary" @click="toPay">下单结算</GlobalButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <Suspense>
        <template #default>
          <GoodRelevant />
        </template>
        <template #fallback> 加载中。。。。。。 </template>
      </Suspense>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CategoryCheckbox from '@/components/home/category/category-checked.vue'
import useStore from '@/stores'
import CartSku from '@/components/cart/cart-sku.vue'
import type { Skus } from '@/api/types'
import cartNone from '@/components/cart/cart-none.vue'
import { checkAllCartAPI, updateCartAPI } from '@/api'

const GoodRelevant = defineAsyncComponent(() => import('@/components/home/goodDetail/goods-relevant.vue'))

const { cart, user } = useStore()
// 是否全选
const isAllchecked = computed({
  get() {
    return cart.validList.length === cart.selectList.length
  },
  async set(value: boolean) {
    if (user.user.token !== '') {
      const ids = cart.validList.map((item) => item.skuId)
      await checkAllCartAPI({ ids, selected: value })
    }
    cart.validList.forEach((item) => (item.selected = value))
  },
})

// 购物车删除的逻辑
const instance = getCurrentInstance()
const deleteCart = (skuId: string) => {
  instance?.proxy?.$Confirm({
    text: '您确认从购物车删除该商品吗？',
    confirm: () => {
      cart.deleteCarList(skuId)
    },
  })
}

// 删除选中全部商品
const totalDelete = () => {
  if (cart.selectList.length === 0) return
  instance?.proxy?.$Confirm({
    text: '您确认从购物车删除全部选中商品吗？',
    confirm: () => {
      cart.deleteCartSelectList()
    },
  })
}

// 清空失效商品
const deleteunvalidList = () => {
  if (cart.unvalidList.length === 0) return
  instance?.proxy?.$Confirm({
    text: '您确认从购物车删除全部失效商品吗？',
    confirm: () => {
      cart.deleteunvalidList()
    },
  })
}
//
const change = (skuid: string, sku: Skus | undefined) => {
  if (sku) {
    cart.updataList(skuid, sku)
  }
}

cart.$subscribe(async (mutation) => {
  /*
      * mutation主要包含三个属性值：
      *   events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
      *   storeId：是当前store的id
      *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
      *         “direct” ：通过 action 变化的
                ”patch object“ ：通过 $patch 传递对象的方式改变的
                “patch function” ：通过 $patch 传递函数的方式改变的
      *
      * */

  if (!(mutation.events instanceof Array)) {
    const key = mutation.events.key
    if (key === 'count') {
      const target = mutation.events.target
      const { skuId, selected } = target as { skuId: string; selected: boolean }
      const count = mutation.events.newValue
      await updateCartAPI({ skuId, selected, count })
    } else if (key === 'selected') {
      const target = mutation.events.target
      const { skuId, count } = target as { skuId: string; count: number }
      const selected = mutation.events.newValue
      await updateCartAPI({ skuId, selected, count })
    }
  }
})

const router = useRouter()
// 去支付
const toPay = () => {
  // 1.判断购物车是否有商品
  if (cart.totalCount === 0) return instance?.proxy?.$Message({ type: 'error', text: '至少选中一件商品才能结算' })
  // 2.是否登录
  if (user.user.token == '') {
    return instance?.proxy?.$Confirm({
      text: '下单结算需要登录，您是否去登录？',
      confirm: () => {
        router.push('/login')
      },
    })
  }
  router.push('/pay')
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
