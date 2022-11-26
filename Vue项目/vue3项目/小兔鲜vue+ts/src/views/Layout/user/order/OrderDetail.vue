<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <orderDetailActionVue :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <orderDetailStepsVue :order="order" />
    <!-- 物流栏 -->
    <orderDetailLogisticsVue :order="order" />

    <!-- 订单商品信息 -->
    <orderDetailGoodVue :order="order" />
  </div>
</template>

<script setup lang="ts">
import { getOrderAPI } from '@/api'
import orderDetailActionVue from '@/components/user/order/orderDetail-action.vue'
import orderDetailStepsVue from '@/components/user/order/orderDetail-steps.vue'
import orderDetailLogisticsVue from '@/components/user/order/orderDetail-logistics.vue'
import orderDetailGoodVue from '@/components/user/order/orderDetail-good.vue'

const order = ref()
const route = useRoute()

watch(
  () => route.params.id,
  async () => {
    order.value = await getOrderAPI(route.params.id as string)
  },
  { immediate: true },
)
</script>

<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
