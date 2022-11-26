<template>
  <!-- 装载是内容 -->
  <div class="xtx-tabs-panel" v-show="activeName === name">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { inject } from 'vue'

defineProps({
  // 标签页标题文章
  label: {
    type: String,
    default: '',
  },
  // 唯一标识
  name: {
    type: String,
    default: '',
  },
})

// 当前组件该不该显示，取决于xtx-tabs组件的activeName数据是否和props.name一样
const activeName = inject('activeName')
</script>
