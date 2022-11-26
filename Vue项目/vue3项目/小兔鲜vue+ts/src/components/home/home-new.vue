<template>
  <div class="home-new" ref="box">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <Globalmove />
      </template>
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for="item in NewList" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>
<script lang="ts" setup>
import HomePanel from './components/home-panel.vue'
import type { NewResult } from '@/api/types/index'
import { getNewAPI } from '@/api'
import { ref } from 'vue'
import { useLazyData } from '@/hooks'

// 观察的dom
const box = ref(null)

// 传递观察的dom和获取数据的请求
const NewList = useLazyData<Array<NewResult>>(box, getNewAPI).List
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
