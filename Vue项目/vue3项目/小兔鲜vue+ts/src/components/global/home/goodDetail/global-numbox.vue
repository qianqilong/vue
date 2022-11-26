<template>
  <div class="xtx-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a @click="value--">-</a>
      <input type="text" readonly v-model="value" />
      <a @click="value++">+</a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ modelValue: number }>()
const emit = defineEmits<{ (e: 'update:modelValue', number: number): void }>()

// 使用计算属性属性修改的同步
const value = computed({
  get() {
    return +props.modelValue
  },
  set(value) {
    if (+value < 1) return
    emit('update:modelValue', +value)
  },
})
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
