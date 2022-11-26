<!-- 放大镜组件 -->
<template>
  <div class="goods-image" v-if="images && images !== []">
    <div class="large" :style="[{ backgroundImage: `url(${images[currIndex]})` }, bgPosition]" v-if="show"></div>
    <div class="middle" @mousemove="move" @mouseleave="leave">
      <img :src="images[currIndex]" alt="" />
      <div class="layer" :style="position" v-if="show"></div>
    </div>
    <ul class="small">
      <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { usePreviewImg } from '@/hooks'

defineProps({
  images: {
    type: Array<string>,
  },
})

const { position, move, leave, show, bgPosition } = usePreviewImg()
const currIndex = ref(0)
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
      pointer-events: none;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
