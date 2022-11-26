<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? '同类商品推荐' : '猜你喜欢' }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <Globalcarousel
      :index="index"
      :length="images.length"
      :autoPlay="true"
      :time="+2000"
      @prevFn="changeFn"
      @nestFn="changeFn"
      @pointFn="changeFn">
      <!-- 插槽中的图片 ,下面可以封装成一个单独的组件-->
      <li class="carousel-item" v-for="(item, i) in images" :key="i" :class="{ fade: index === i }">
        <div class="slider">
          <RouterLink v-for="(goods, i) in item" :key="i" :to="`/product/${goods.id}`">
            <img :src="goods?.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </Globalcarousel>
  </div>
</template>

<script lang="ts" setup>
import { getRelGoodsAPI } from '@/api'
import type { goodDetailResult } from '@/api/types'
import { ref, type Ref } from 'vue'

// 第几张轮播图
const index = ref(0)

// 改变index
const changeFn = (i: number) => {
  index.value = i
}
const props = defineProps({
  goodsId: {
    type: String,
    default: '',
  },
})

const images: Ref<Array<Array<goodDetailResult>>> = ref([])
const data = (await getRelGoodsAPI(+props.goodsId)) as goodDetailResult[]
for (let i = 0; i < 4; i++) {
  if (data) {
    images.value.push(data.slice(i * 4, (i + 1) * 4))
  }
}
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  // 轮播商品
  .slider {
    display: flex;
    justify-content: space-around;
    padding: 0 40px;
    > a {
      width: 240px;
      text-align: center;
      img {
        padding: 20px;
        width: 230px !important;
        height: 230px !important;
      }
      .name {
        font-size: 16px;
        color: #666;
        padding: 0 40px;
      }
      .price {
        font-size: 16px;
        color: @priceColor;
        margin-top: 15px;
      }
    }
  }
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
