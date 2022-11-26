<template>
  <form>
    <slot name="rule" :errors="errors"></slot>
  </form>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

const props = defineProps({
  rule: {
    type: Object,
    default: () => {},
  },
  form: {
    type: Object,
    default: () => {},
  },
})

type stringKey = Record<string, any>
const errors: Ref<stringKey> = ref({})
// 获取错误信息
const getErr = () => {
  let count = 0
  const arr = Object.keys(props.form)
  for (let i in props.rule) {
    for (let j in props.form) {
      if (i === j) {
        errors.value[i] = props.rule[i](props.form[j])
        if (errors.value[i] === true) {
          errors.value[i] = null
          count++
        }
      }
    }
  }

  if (count === arr.length) {
    return true
  }
}

// 清除错误信息
const clearErr = () => {
  for (let i in props.form) {
    errors.value[i] = null
  }
}
// 监听props
watch(
  () => props.form,
  () => {
    getErr()
  },
  {
    deep: true,
  },
)
defineExpose({ getErr, clearErr })
</script>

<style scoped lang="less"></style>
