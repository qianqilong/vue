<template>
  <GlobalDialog title="取消订单" v-model:flag="flag">
    <!-- 组件内容 -->
    <div class="cancel-info">
      <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="btn">
        <a
          @click="curText = item"
          v-for="item in cancelReason"
          :key="item"
          href="javascript:;"
          :class="{ active: curText === item }">
          {{ item }}
        </a>
      </div>
    </div>
    <!-- 按钮操作 -->
    <template #footer>
      <GlobalButton type="gray" @click="flag = false" style="margin-right: 20px">取消</GlobalButton>
      <GlobalButton type="primary" @click="submit">确认</GlobalButton>
    </template>
  </GlobalDialog>
</template>
<script lang="ts" setup>
import { cancelOrderAPI } from '@/api'

const emit = defineEmits(['refresh'])
const cancelReason = [
  '配送信息有误',
  '商品买错了',
  '重复下单/误下单',
  '忘记使用优惠券、兔币等',
  '其他渠道价格更低',
  '不想买了',
]
const flag = ref(false)
const curText = ref()
// 控制对话框显示
const show = () => {
  flag.value = true
}
// 控制对话框隐藏
const hide = () => {
  flag.value = false
}
// 点击确认按键提交请求
const orderId = ref()
const submit = async () => {
  if (!curText.value && !orderId.value) return
  await cancelOrderAPI(orderId.value, cancelReason[curText.value])
  // 通知父组件区刷新
  emit('refresh')
  flag.value = false
}
defineExpose({
  show,
  hide,
  orderId,
})
</script>
<style scoped lang="less">
.xtx-dialog ::v-deep .wrapper {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
s
