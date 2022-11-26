<template>
  <div class="detail-action" v-if="order">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <p>{{ orderStatus[order.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ order.id }}</p>
      <p>下单时间：{{ order.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="order.orderState === 1">
        <GlobalButton @click="$router.push('/payjump?id=' + order?.id)" type="primary" size="small"
          >立即付款</GlobalButton
        >
        <GlobalButton type="gray" size="small">取消订单</GlobalButton>
      </template>
      <!-- 待发货 -->
      <template v-if="order.orderState === 2">
        <GlobalButton type="primary" size="small">再次购买</GlobalButton>
      </template>
      <!-- 待收货 -->
      <template v-if="order.orderState === 3">
        <GlobalButton type="primary" size="small">确认收货</GlobalButton>
        <GlobalButton type="plain" size="small">再次购买</GlobalButton>
      </template>
      <!-- 待评价 -->
      <template v-if="order.orderState === 4">
        <GlobalButton type="primary" size="small">再次购买</GlobalButton>
        <GlobalButton type="plain" size="small">评价商品</GlobalButton>
        <GlobalButton type="gray" size="small">申请售后</GlobalButton>
      </template>
      <!-- 已完成 -->
      <template v-if="order.orderState === 5">
        <GlobalButton type="primary" size="small">再次购买</GlobalButton>
        <GlobalButton type="plain" size="small">查看评价</GlobalButton>
        <GlobalButton type="gray" size="small">申请售后</GlobalButton>
      </template>
      <!-- 已取消 -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { orderStatus } from '@/api'

defineProps({
  order: {
    type: Object,
  },
})
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
