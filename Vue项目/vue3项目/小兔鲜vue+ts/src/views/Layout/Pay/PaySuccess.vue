<template>
  <div class="xtx-pay-page" v-if="order">
    <div class="container">
      <Globalbread>
        <GlobalbreadItem to="/">首页</GlobalbreadItem>
        <GlobalbreadItem to="/cart">购物车</GlobalbreadItem>
        <GlobalbreadItem>支付结果</GlobalbreadItem>
      </Globalbread>
      <!-- 支付结果 -->
      <div class="pay-result">
        <span class="iconfont icon-queren2 green"></span>
        <!-- <span class="iconfont icon-shanchu red" ></span> -->
        <p class="tit">订单支付{{ route.query.payResult ? '成功' : '失败' }}</p>
        <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
        <p>支付方式：<span>支付宝支付</span></p>
        <p>
          支付金额：<span>¥{{ order.payMoney }}.00</span>
        </p>
        <div class="btn">
          <GlobalButton
            type="primary"
            style="margin-right: 20px"
            @click="router.push('/user/order/' + route.query.orderId)"
            >查看订单</GlobalButton
          >
          <GlobalButton type="gray" @click="router.push('/')">进入首页</GlobalButton>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getOrderAPI } from '@/api'

const route = useRoute()
const router = useRouter()
const order: any = ref()
onMounted(async () => {
  try {
    order.value = await getOrderAPI(route.params.id as string)
  } catch (e) {
    router.push('/')
  }
})
</script>
<style scoped lang="less">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: @priceColor;
  }
  .tit {
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>
