<template>
  <div class="xtx-confirm" v-if="isShow">
    <div class="wrapper">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new" @click="CancelFn"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ text }}</span>
      </div>
      <div class="footer">
        <GlobalButton size="mini" type="gray" @click="CancelFn">取消</GlobalButton>
        <GlobalButton size="mini" type="primary" @click="ConfirmFn">确认</GlobalButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import GlobalButton from '@/components/global/home/goodDetail/global-button.vue'
const props = defineProps({
  title: {
    type: String,
    default: '温馨提示',
  },
  text: {
    type: String,
    default: '',
  },
  cancel: {
    type: Function,
    default: () => {},
  },
  confirm: {
    type: Function,
    default: () => {},
  },
})

const isShow = ref(false)

const hide = () => {
  isShow.value = false
}

const show = () => {
  isShow.value = true
}
// 取消
const CancelFn = () => {
  props.cancel()
  hide()
}
// 确定
const ConfirmFn = () => {
  props.confirm()
  hide()
}
defineExpose({
  show,
})
</script>
<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0.5);
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
