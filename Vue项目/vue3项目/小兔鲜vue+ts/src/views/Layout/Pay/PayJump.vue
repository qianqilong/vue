<template>
  <div class="xtx-pay-page">
    <div class="container">
      <Globalbread>
        <GlobalbreadItem to="/">首页</GlobalbreadItem>
        <GlobalbreadItem to="/cart">购物车</GlobalbreadItem>
        <GlobalbreadItem>支付订单</GlobalbreadItem>
      </Globalbread>
      <!-- 付款信息 -->
      <div class="pay-info" v-if="order">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p v-if="time[0] !== 0 && time[1] !== 0">
            支付还剩 <span>{{ time[0] }}分{{ time[1] }}秒</span>, 超时后将取消订单
          </p>
          <p v-else>订单已经超时</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{ order.payMoney }}.00</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" :href="payUrl" target="_blank" @click="flag = true"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
  </div>
  <!-- 对话框 -->
  <GlobalDialog title="正在支付..." v-model:flag="flag">
    <div class="pay-wait">
      <img src="@/assets/images/load.gif" alt="" />
      <div v-if="order">
        <p>如果支付成功：</p>
        <RouterLink :to="`/member/order/${order.id}`">查看订单详情></RouterLink>
        <p>如果支付失败：</p>
        <RouterLink to="/">查看相关疑问></RouterLink>
      </div>
    </div>
  </GlobalDialog>
</template>
<script lang="ts" setup>
import { getOrderAPI } from '@/api'
import { baseURL } from '@/utils/ajax'

// 订单
const order: any = ref()
// 路由信息
const route = useRoute()
// 获取订单信息
const time = reactive([30, 0])
onMounted(async () => {
  order.value = await getOrderAPI(route.query.orderId as string)
  time[0] = Math.floor(order.value.countdown / 60)
  time[1] = order.value.countdown % 60
})

// 定时函数
const start = () => {
  time[1]--
  if (time[1] < 0) {
    time[1] = 60
    time[0] = time[0] - 1
  }
}

const timer = setInterval(() => {
  if (time[0] === 0 && time[1] === 0) {
    clearInterval(timer)
  }
  start()
}, 1000)
// 组件销毁时清除定时器
onBeforeUnmount(() => {
  clearInterval(timer)
})
// 支付地址
// const payUrl = '后台服务基准地址+支付页面地址+订单ID+回跳地址'
const redirect = encodeURIComponent('http://www.corho.com:8080/#/paysuccess/' + route.query.orderId)
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.orderId}&redirect=${redirect}`

const flag = ref(false)
</script>
<style scoped lang="less">
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @xtxColor;
    }
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat
        center / contain;
    }
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat
        center / contain;
    }
  }
}
.pay-wait {
  display: flex;
  justify-content: space-around;
  p {
    margin-top: 30px;
    font-size: 14px;
  }
  a {
    color: @xtxColor;
  }
}
</style>
