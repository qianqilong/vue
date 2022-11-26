<template>
  <div class="xtx-infinite-loading" v-element ref="box">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const emit = defineEmits<{ (e: 'infinite'): void }>()
const props = defineProps<{ loading: boolean; finished: boolean }>()
const box = ref(null)

// useIntersectionObserver(
//   // 观察目标
//   box,
//   ([{ isIntersecting }]) => {
//     if (isIntersecting) {
//       if (props.loading === false && props.finished === false) {
//         emit('infinite')
//       }
//     }
//   },
// )

const vElement = {
  mounted: (el: Element) => {
    const ob = new IntersectionObserver(([{ isIntersecting }]) => {
      // 如果到了观察区
      if (isIntersecting) {
        // 如果其不是
        if (props.loading === false && props.finished === false) {
          emit('infinite')
        }
      }
    })
    ob.observe(el)
  },
}
</script>

<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(@/assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(@/assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
