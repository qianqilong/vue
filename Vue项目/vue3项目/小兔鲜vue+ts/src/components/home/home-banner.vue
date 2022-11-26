<template>
  <div class="home-banner">
    <!--
index:第几个图片
length:图片数组的长度
autoPlay:是否开启自动播放
time:自动播放切换时间

@prevFn:点击上一个按键(传递一个参数改变index)
@nestFn:点击下一个按键(传递一个参数改变index)
@@pointFn:点击下面的点(传递一个参数改变index)

#bann:作用域插槽的名称
      -->
    <Globalcarousel
      :index="index"
      :length="category.bannerList.length"
      :autoPlay="true"
      :time="+2000"
      @prevFn="changeFn"
      @nestFn="changeFn"
      @pointFn="changeFn">
      <!-- 插槽中的图片 ,下面可以封装成一个单独的组件-->
      <li class="carousel-item" v-for="(item, i) in category.bannerList" :key="item.id" :class="{ fade: index === i }">
        <router-link :to="item.hrefUrl">
          <img v-lazyload="item.imgUrl" alt="" />
        </router-link>
      </li>
    </Globalcarousel>
  </div>
</template>
<script lang="ts" setup>
import useStore from '@/stores'
import { ref } from 'vue'

// 第几张轮播图
const index = ref(0)
// pinia的实例
const { category } = useStore()
// 改变index
const changeFn = (i: number) => {
  index.value = i
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
