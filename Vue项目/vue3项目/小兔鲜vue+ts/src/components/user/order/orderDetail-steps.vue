<template>
  <div class="detail-steps" style="padding: 20px">
    <GlobalStep :active="order.orderState === 6 ? 1 : order.orderState">
      <GlobalStepItem title="提交订单" :desc="order.createTime" />
      <GlobalStepItem title="付款成功" :desc="order.payTime" />
      <GlobalStepItem title="商品发货" :desc="order.consignTime" />
      <GlobalStepItem title="确认收货" :desc="order.evaluationTime" />
      <GlobalStepItem title="订单完成" :desc="order.endTime" />
    </GlobalStep>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  order: {
    type: Object,
    default: () => ({}),
  },
})
</script>
<style scoped lang="less"></style>
