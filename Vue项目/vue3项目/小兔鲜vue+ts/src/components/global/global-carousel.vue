<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <slot></slot>
    </ul>
    <a class="carousel-btn prev"><i class="iconfont icon-angle-left" @click="prevFn"></i></a>
    <a class="carousel-btn next"><i class="iconfont icon-angle-right" @click="nestFn"></i></a>
    <div class="carousel-indicator">
      <span
        v-for="i in props.length"
        :key="i"
        :class="{ active: props.index === i - 1 }"
        @click="pointFn(i - 1)"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * index:第几个图片
 * length:图片数组的长度
 * autoPlay:是否开启自动播放
 * time:自动播放切换时间
 */
const props = defineProps({
  index: {
    type: Number,
    default: 1,
  },
  length: {
    type: Number,
    default: 5,
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Number,
    default: 3000,
  },
})
/**
 * 点击左右按键
 */
const emit = defineEmits(['prevFn', 'nestFn', 'pointFn'])

// 点击prev
const prevFn = () => {
  let index = props.index
  index = index - 1
  if (index < 0) index = props.length - 1
  emit('prevFn', index)
}

// 点击nest
const nestFn = () => {
  let index = props.index
  index = index + 1
  if (index > props.length - 1) index = 0
  emit('nestFn', index)
}

// 点击点
const pointFn = (index: number) => {
  emit('nestFn', index)
}

let timer = 0 // 定时器
// 自动播放
const autoPlayFn = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    nestFn()
  }, props.time)
}

// 判断是否开启自动播放
if (props.autoPlay === true) {
  autoPlayFn()
}

// 鼠标移上停止
const stop = () => {
  if (timer !== 0) {
    clearInterval(timer)
  }
}

// 鼠标松开开始
const start = () => {
  if (props.autoPlay) {
    autoPlayFn()
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    :slotted(&-item) {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      :slotted(&.fade) {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
