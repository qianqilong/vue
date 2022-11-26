<template>
  <GlobalDialog title="切换收货地址" v-model:flag="flag">
    <div
      class="text item"
      v-for="item in addr.userAddresses"
      :key="item.id"
      @click="checkedId = item.id"
      :class="{ active: checkedId === item.id }">
      <ul>
        <li>
          <span>收<i />货<i />人：</span>{{ item.receiver }}
        </li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li><span>收货地址：</span>{{ item.fullLocation }}</li>
      </ul>
    </div>

    <template #footer>
      <GlobalButton type="gray" style="margin-right: 20px" @click="flag = false">取消</GlobalButton>
      <GlobalButton type="primary" @click="ConfirFn">确认</GlobalButton>
    </template>
  </GlobalDialog>
</template>
<script lang="ts" setup>
import type { PayResult } from '@/api/types'

const props = defineProps({
  addr: {
    type: Object,
    default: {} as PayResult,
  },
  defaultId: {
    type: String,
  },
})
const emit = defineEmits(['checkAddress'])
// 切换的id
const checkedId = ref(props.defaultId)
// 点击确认
const ConfirFn = () => {
  emit('checkAddress', checkedId.value)
  flag.value = false
}
// 控制对话框的显示和隐藏
const flag = ref(false)
// 控制其显示
const show = async () => {
  flag.value = true
}
// 控制其隐藏
const hide = () => {
  flag.value = false
}
// 方便父组件调用
defineExpose({
  show,
  hide,
})
</script>
<style scoped lang="less">
.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;
  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;
    &.active {
      border-color: @xtxColor;
      background: lighten(@xtxColor, 50%);
    }
    > ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>
