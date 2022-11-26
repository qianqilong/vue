<template>
  <!-- 头部导航 -->
  <div class="member-order-page">
    <GlobalTab v-model="activeName" @tab-click="Tabclick">
      <GlobalTabPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name">{{
        item.label
      }}</GlobalTabPanel>
    </GlobalTab>
  </div>
  <div class="order-list" v-if="!flag && orderList.length !== 0">
    <orderItemVue
      v-for="item in orderList"
      :order="item"
      :key="item.id"
      @cancelOrder="cancelOrder(item.id)"
      @deleteOrder="deleteOrder(item.id)"
      @getlogistics="getlogistics(item.id)"
      @receiptOrder="receiptOrder(item.id)" />
  </div>
  <div v-else-if="flag" class="loading"></div>
  <div class="cart-none" v-else>
    <img src="@/assets/images/none.png" alt="" />
    <p>订单内暂时没有商品</p>
    <div class="btn">
      <GlobalButton type="primary" @click="$router.push('/')">继续逛逛</GlobalButton>
    </div>
  </div>
  <!-- 取消订单对话框 -->
  <orderCancelVue ref="orderCance" @refresh="refresh" />
  <!-- 查看物流对话框 -->
  <orderLogisticsVue ref="orderLogistics" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { orderStatus, getOrderListAPI, delteOrderAPI, receiptOrderAPI } from '@/api'
import type { orderResult } from '@/api/types'
import orderItemVue from '@/components/user/order/order-item.vue'
import orderCancelVue from '@/components/user/order/order-cancel.vue'
import orderLogisticsVue from '@/components/user/order/order-logistics.vue'

const activeName = ref('all')

const orderParams = reactive({
  page: 1,
  pageSize: 5,
  orderState: 0,
  // 1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
})
// 订单列表
const orderList = ref()
const flag = ref(true)
// 刷新
const refresh = async () => {
  orderList.value = undefined
  flag.value = true
  orderList.value = ((await getOrderListAPI(orderParams)) as orderResult).items
  if (orderList.value) {
    flag.value = false
  }
}
// 获取订单数据
watch(
  () => orderParams.orderState,
  async () => {
    refresh()
  },
  { immediate: true },
)
// 点击改变筛选
const Tabclick = (state: { index: number }) => {
  console.log(state.index)
  orderParams.orderState = state.index
}
// 取消订单
const orderCance: any = ref(null)
// 子组件通知父组件
const cancelOrder = (id: string) => {
  // 给子组件的订单赋值
  orderCance.value.orderId = id
  //  控制显示
  orderCance.value.show()
}
const instance = getCurrentInstance()
// 删除订单
const deleteOrder = async (id: string) => {
  instance?.proxy?.$Confirm({
    text: '您确认删除该条订单吗？',
    confirm: async () => {
      await delteOrderAPI([id])
      instance?.proxy?.$Message({ text: '删除订单成功', type: 'success' })
      refresh()
    },
  })
}
// 查看物流
const orderLogistics: any = ref(null)
const getlogistics = (id: string) => {
  orderLogistics.value.show(id)
}
// 确认收货
const receiptOrder = (id: string) => {
  instance?.proxy?.$Confirm({
    text: '您确认收货吗？',
    confirm: async () => {
      await receiptOrderAPI(id)
      instance?.proxy?.$Message({ text: '收货成功', type: 'success' })
      refresh()
    },
  })
}
</script>
<style scoped lang="less">
.order-list {
  background: #fff;
  padding: 20px;
}
.loading {
  height: 500px;
  background: url(@/assets/images/loading.gif) no-repeat center;
}
.cart-none {
  text-align: center;
  padding: 150px 0;
  background: #fff;
  img {
    width: 180px;
  }
  p {
    color: #999999;
    padding: 20px 0;
  }
}
</style>
